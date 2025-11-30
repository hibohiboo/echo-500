# プレイヤーキャラクター管理機能 実装計画

## 概要

`apps/character-sheet` アプリケーションにプレイヤーキャラクター管理機能を追加する。
既存の `apps/scenario-editor` と同様に、RDB + GraphDB の組み合わせでデータを管理する。

## 実装フィードバック（2025-11-29）

### フェーズ1完了: スキーマ層
✅ **完了済み**

#### 実装内容
1. **PlayerCharacterSchema** ([packages/schema/src/playerCharacter.ts](../packages/schema/src/playerCharacter.ts))
   - `PlayerCharacterSchema`: Date型（UI層用）
   - `SerializablePlayerCharacterSchema`: string型（API/Redux用）
   - `PlayerCharacterFormDataSchema`: フォーム入力用
   - 変換関数、パース関数、ペイロードスキーマを完備

2. **BattleCommandSchema** ([packages/schema/src/battleCommand.ts](../packages/schema/src/battleCommand.ts))
   - **設計変更**: 既存の`packages/frontend-common/src/types/battleCommand.ts`に準拠
   - 当初計画の簡易的な構造から、実際のルールブックで使用される詳細な構造に変更

#### BattleCommandスキーマの実装詳細

**変更前（計画）:**
```typescript
{
  id: string,
  name: string,
  description: string,
  commandType: 'attack' | 'defense' | 'support' | 'special'
}
```

**変更後（実装）:**
```typescript
{
  id: string,
  class: string,        // クラス名（職業など）
  name: string,
  cp: number,           // コストポイント
  timing: string,       // タイミング
  cost: string,         // コスト
  range: string,        // 射程
  effect: string,       // 効果
  target: string,       // 対象
  flavor: string,       // フレーバーテキスト
  tags: string[],       // タグ
  details: string       // 詳細説明
}
```

#### Valibotリファクタリング（冗長性削減）
```typescript
// ルールブック用基本スキーマ（idなし）
export const BattleCommandSchema = v.object({
  class: v.string(),
  name: v.string(),
  cp: v.number(),
  // ... その他のフィールド
});

// GraphDB管理用（id + sortOrder追加）
export const GraphDbBattleCommandSchema = v.object({
  ...BattleCommandSchema.entries,
  id: v.string(),
  sortOrder: v.number(),
});

// プレイヤーキャラクター用（GraphDbBattleCommandSchemaを継承）
export const PlayerCharacterBattleCommandSchema = v.object({
  ...GraphDbBattleCommandSchema.entries,
  sortOrder: v.number(),
});

// フォームデータ用（idを除外）
export const BattleCommandFormDataSchema = v.omit(
  PlayerCharacterBattleCommandSchema,
  ['id']
);
```

**スキーマの使い分け:**
- `BattleCommandSchema`: ルールブック静的データ（idなし）
- `GraphDbBattleCommandSchema`: GraphDB保存用（id + sortOrder付き）
- `PlayerCharacterBattleCommandSchema`: プレイヤーキャラクターのバトルコマンド
- `BattleCommandFormDataSchema`: 作成/更新フォーム用（idなし）

#### バトルコマンドID管理方針（YAGNI原則）

**基本方針:**
- **ルールブックデータ（Googleスプレッドシート）にはIDを持たせない**
- プレイヤーキャラクターがバトルコマンドを取得する際にGraphDBでIDを発番
- 同じプレイヤーが同じコマンドを複数回取得することは**不可**（重複チェックを実装）

**設計意図:**
1. **カスタマイズ性**: 各プレイヤーが独自にコマンドをカスタマイズ可能
2. **データ管理の簡素化**: ルールブックは静的データとして管理
3. **YAGNI準拠**: レコメンド機能など将来必要になるかもしれない機能のために今複雑化しない

**データフロー:**
```
1. ルールブック表示
   → BattleCommandSchema（IDなし）を使用

2. PCへのコマンド追加
   → ルールブックからコマンドを選択
   → 重複チェック（同じname + classのコマンドが既に存在するか確認）
   → 重複なし: GraphDBで新規ID発番
   → GraphDbBattleCommandSchemaとしてGraphDBに保存
   → HAS_BATTLE_COMMANDリレーションでPCと紐付け

3. PCのコマンド管理
   → GraphDBからGraphDbBattleCommandSchemaとして取得
```

**重複チェック仕様:**
- 判定キー: `class` + `name` の組み合わせ
- 同一PCに対して同じコマンドは1つまで
- 削除後の再取得は可能

#### 既存コード更新
- `packages/frontend-common/src/types/battleCommand.ts`を`@echo-500/schema`の型を使用するように変更
- `packages/schema/src/index.ts`に`playerCharacter`と`battleCommand`をエクスポート追加

#### GraphDBスキーマへの影響
BattleCommandノードの構造を以下のように更新する必要があります:

**変更前:**
```cypher
CREATE NODE TABLE BattleCommand (
  id STRING,
  name STRING,
  description STRING,
  commandType STRING,
  PRIMARY KEY (id)
)
```

**変更後:**
```cypher
CREATE NODE TABLE BattleCommand (
  id STRING,
  class STRING,
  name STRING,
  cp INT64,
  timing STRING,
  cost STRING,
  range STRING,
  effect STRING,
  target STRING,
  flavor STRING,
  tags STRING,      -- JSON文字列として保存
  details STRING,
  PRIMARY KEY (id)
)
```

**注意**: GraphDBではJSON配列を直接サポートしないため、`tags`はJSON文字列として保存し、アプリケーション層でパース/シリアライズを行う。

## 要件定義

### 機能要件
1. **プレイヤーキャラクターのCRUD操作**
   - 作成、読み取り、更新、削除
   - 一覧表示

2. **データ管理**
   - **RDB (PostgreSQL)**: 基本情報（ID、名前、作成日時、更新日時）
   - **GraphDB (KùzuDB)**: ゲームデータ（バトルコマンド、ステータス、装備など）

3. **データの永続化**
   - ブラウザローカルでの完結（サーバー不要）
   - IndexedDB経由でのDB操作

## データ設計

### RDB スキーマ設計

#### player_characters テーブル
```sql
CREATE TABLE player_characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

**カラム定義:**
- `id`: プレイヤーキャラクターの一意識別子
- `name`: キャラクター名
- `created_at`: レコード作成日時
- `updated_at`: レコード更新日時

### GraphDB スキーマ設計

#### PlayerCharacter ノード
```cypher
CREATE NODE TABLE PlayerCharacter (
  id STRING,
  name STRING,
  PRIMARY KEY (id)
)
```

#### BattleCommand ノード
```cypher
CREATE NODE TABLE BattleCommand (
  id STRING,
  class STRING,        -- クラス名（職業など）
  name STRING,
  cp INT64,            -- コストポイント
  timing STRING,       -- タイミング
  cost STRING,         -- コスト
  range STRING,        -- 射程
  effect STRING,       -- 効果
  target STRING,       -- 対象
  flavor STRING,       -- フレーバーテキスト
  tags STRING,         -- タグ（JSON文字列）
  details STRING,      -- 詳細説明
  PRIMARY KEY (id)
)
```
**Note**: `tags`はJSON配列を文字列化して保存（例: `"[\"tag1\", \"tag2\"]"`）

#### HAS_BATTLE_COMMAND リレーション
```cypher
CREATE REL TABLE HAS_BATTLE_COMMAND (
  FROM PlayerCharacter TO BattleCommand,
  sortOrder INT64  -- コマンドの並び順
)
```

## アーキテクチャ設計

### ディレクトリ構造（新規作成）

```
apps/character-sheet/
├── src/
│   ├── app/
│   │   ├── router.tsx              # ルーティング定義（更新）
│   │   └── store/                  # Redux store（既存）
│   │       ├── index.ts
│   │       └── rootReducer.ts
│   │
│   ├── entities/                   # Entity層（新規作成）
│   │   ├── playerCharacter/
│   │   │   ├── actions/
│   │   │   │   ├── playerCharacterActions.ts
│   │   │   │   └── playerCharacterBattleCommandActions.ts
│   │   │   ├── api/
│   │   │   │   ├── playerCharacterRdbApi.ts
│   │   │   │   └── playerCharacterGraphApi.ts
│   │   │   ├── hooks/
│   │   │   │   ├── usePlayerCharacterList.ts
│   │   │   │   ├── useCreatePlayerCharacter.ts
│   │   │   │   ├── useUpdatePlayerCharacter.ts
│   │   │   │   └── useDeletePlayerCharacter.ts
│   │   │   ├── model/
│   │   │   │   └── playerCharacterSlice.ts
│   │   │   └── index.ts
│   │   │
│   │   └── battleCommand/
│   │       ├── actions/
│   │       │   └── battleCommandActions.ts    # 純粋なAPI操作のみ
│   │       ├── api/
│   │       │   └── battleCommandGraphApi.ts
│   │       ├── model/
│   │       │   └── battleCommandSlice.ts
│   │       └── index.ts
│   │
│   ├── features/                   # Feature層（新規作成）
│   │   └── playerCharacterBattleCommandManagement/
│   │       ├── actions/
│   │       │   └── battleCommandManagementActions.ts  # 統合ビジネスロジック
│   │       ├── hooks/
│   │       │   └── useBattleCommandManagement.ts
│   │       └── index.ts
│   │
│   └── pages/
│       └── player-character/       # 新規ページ（予定）
│           ├── ui/
│           │   └── Page.tsx
│           └── index.ts
```

### 共通パッケージの拡張

#### packages/schema/
```
packages/schema/src/
├── playerCharacter.ts              # 新規作成
└── battleCommand.ts                # 新規作成
```

#### packages/rdb/
```
packages/rdb/
├── src/
│   ├── schema.ts                   # player_characters テーブル追加
│   └── queries/
│       └── playerCharacterRepository.ts  # 新規作成
└── migrations/
    └── 000X_add_player_characters.sql    # 新規マイグレーション
```

#### packages/graphdb/
```
packages/graphdb/src/
├── schemas.ts                      # PlayerCharacter, BattleCommand ノード追加
└── queries/
    ├── playerCharacterRepository.ts   # 新規作成
    └── battleCommandRepository.ts     # 新規作成
```

#### packages/ui/
```
packages/ui/src/
└── playerCharacter/                # 新規作成
    ├── PlayerCharacterList.tsx
    ├── PlayerCharacterCreateModal.tsx
    ├── BattleCommandList.tsx
    ├── BattleCommandForm.tsx
    ├── types.ts
    └── index.ts
```

## 実装手順

### フェーズ1: スキーマ層

#### 1-1. Schema定義
- [x] ~~`packages/schema/src/playerCharacter.ts` 作成~~ ✅ **完了**
  ```typescript
  // Date型とstring型の両方のスキーマを定義
  export const PlayerCharacterSchema = v.object({
    id: v.string(),
    name: v.string(),
    createdAt: v.date(),
    updatedAt: v.date(),
  });

  export const SerializablePlayerCharacterSchema = v.object({
    id: v.string(),
    name: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
  });
  ```

- [x] ~~`packages/schema/src/battleCommand.ts` 作成~~ ✅ **完了**
  ```typescript
  // 既存のBattleCommandCardData構造に準拠
  export const BattleCommandSchema = v.object({
    id: v.string(),
    class: v.string(),
    name: v.string(),
    cp: v.number(),
    timing: v.string(),
    cost: v.string(),
    range: v.string(),
    effect: v.string(),
    target: v.string(),
    flavor: v.string(),
    tags: v.array(v.string()),
    details: v.string(),
  });

  // Valibotのスプレッド構文とv.omitで冗長性を削減
  export const PlayerCharacterBattleCommandSchema = v.object({
    ...BattleCommandSchema.entries,
    sortOrder: v.number(),
  });

  export const BattleCommandFormDataSchema = v.omit(BattleCommandSchema, ['id']);
  ```

- [x] ~~`packages/schema/src/index.ts`にエクスポート追加~~ ✅ **完了**
- [x] ~~`packages/frontend-common/src/types/battleCommand.ts`を更新~~ ✅ **完了**

### フェーズ2: データベース層（RDB）
✅ **完了済み**

#### 2-1. RDB スキーマ追加
- [x] ~~`packages/rdb/src/schema.ts` に `playerCharactersTable` 追加~~ ✅ **完了**
  ```typescript
  export const playerCharactersTable = pgTable('player_characters', {
    id: uuid().primaryKey().defaultRandom(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  });
  ```

#### 2-2. マイグレーション生成
- [x] ~~`bun run db:generate` 実行~~ ✅ **完了**
- [x] ~~生成されたマイグレーションファイル確認~~ ✅ **完了**

#### 2-3. Repository実装
- [x] ~~`packages/rdb/src/queries/playerCharacterRepository.ts` 作成~~ ✅ **完了**
  - `create(name: string): Promise<PlayerCharacter>`
  - `findAll(): Promise<PlayerCharacter[]>`
  - `findById(id: string): Promise<PlayerCharacter | null>`
  - `update(id: string, name: string): Promise<PlayerCharacter>`
  - `delete(id: string): Promise<void>`

#### 2-4. ユニットテスト
- [x] ~~`packages/rdb/src/queries/playerCharacterRepository.test.ts` 作成~~ ✅ **完了**

### フェーズ3: データベース層（GraphDB）
✅ **完了済み**

#### 3-1. GraphDB スキーマ追加
- [x] ~~`packages/graphdb/src/schemas.ts` に以下を追加~~ ✅ **完了**
  - `PlayerCharacter` ノード
  - `BattleCommand` ノード
  - `HAS_BATTLE_COMMAND` リレーション

#### 3-2. Repository実装
- [x] ~~`packages/graphdb/src/queries/playerCharacterRepository.ts` 作成~~ ✅ **完了**
  - `create(id: string): Promise<void>`
  - `findById(id: string): Promise<PlayerCharacter | null>`
  - `delete(id: string): Promise<void>`
  - `getBattleCommands(characterId: string): Promise<PlayerCharacterBattleCommand[]>`

- [x] ~~`packages/graphdb/src/queries/battleCommandRepository.ts` 作成~~ ✅ **完了**
  - `create(params: CreateBattleCommandParams): Promise<GraphDbBattleCommandNode>` - ID発番してBattleCommandノード作成
  - `checkDuplicate(characterId: string, className: string, commandName: string): Promise<boolean>` - 重複チェック
  - `linkToCharacter(characterId: string, commandId: string, sortOrder: number): Promise<void>` - HAS_BATTLE_COMMANDリレーション作成
  - `unlinkFromCharacter(characterId: string, commandId: string): Promise<void>`
  - `updateSortOrder(characterId: string, commandId: string, sortOrder: number): Promise<void>`
  - `delete(commandId: string): Promise<void>`

#### 3-3. ユニットテスト
- [x] ~~`packages/graphdb/src/queries/playerCharacterRepository.test.ts` 作成~~ ✅ **完了** (5 tests passed)
- [x] ~~`packages/graphdb/src/queries/battleCommandRepository.test.ts` 作成~~ ✅ **完了** (7 tests passed)

### フェーズ4: フロントエンド Entity層
✅ **完了済み**

#### 設計変更: Feature-Sliced Design準拠
**重要な設計原則:**
- Entity層は**単一エンティティの純粋なCRUD操作のみ**
- Entity層同士の直接インポートは**禁止**
- 複数entityを組み合わせたビジネスロジックは**Feature層**で実装

#### 4-1. API層実装
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/api/playerCharacterRdbApi.ts` 作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/api/playerCharacterGraphApi.ts` 作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/battleCommand/api/battleCommandGraphApi.ts` 作成~~ ✅ **完了**

#### 4-2. Redux State管理
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/model/playerCharacterSlice.ts` 作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/battleCommand/model/battleCommandSlice.ts` 作成~~ ✅ **完了**

#### 4-3. Actions実装
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/actions/playerCharacterActions.ts` 作成~~ ✅ **完了**
  - プレイヤーキャラクターのCRUD操作（Redux操作を含む）
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/actions/playerCharacterBattleCommandActions.ts` 作成~~ ✅ **完了**
  - バトルコマンド取得（**API操作のみ、Redux操作なし**）
- [x] ~~`apps/character-sheet/src/entities/battleCommand/actions/battleCommandActions.ts` 作成~~ ✅ **完了**
  - バトルコマンドノード操作（**純粋なAPI操作のみ、Redux操作なし**）

#### 4-4. Hooks実装
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/hooks/usePlayerCharacterList.ts` 作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/hooks/useCreatePlayerCharacter.ts` 作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/hooks/useUpdatePlayerCharacter.ts` 作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/hooks/useDeletePlayerCharacter.ts` 作成~~ ✅ **完了**

#### 4-5. Feature層実装（新規追加）
- [x] ~~`apps/character-sheet/src/features/playerCharacterBattleCommandManagement/actions/battleCommandManagementActions.ts` 作成~~ ✅ **完了**
  - `fetchBattleCommands()` - playerCharacter API + battleCommand Redux更新
  - `createAndLinkBattleCommand()` - battleCommand作成 + リンク + Redux更新
  - `unlinkBattleCommand()` - リンク解除 + Redux更新
  - `deleteBattleCommand()` - ノード削除 + Redux更新
  - `updateBattleCommandSortOrder()` - 並び順更新 + Redux更新
- [x] ~~`apps/character-sheet/src/features/playerCharacterBattleCommandManagement/hooks/useBattleCommandManagement.ts` 作成~~ ✅ **完了**

#### 4-6. index.tsエクスポート整理
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/index.ts` 作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/battleCommand/index.ts` 作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/features/playerCharacterBattleCommandManagement/index.ts` 作成~~ ✅ **完了**

#### 4-7. Workers実装（2025-11-29追加）
- [x] ~~Worker基盤実装~~ ✅ **完了**
  - [x] ~~`apps/character-sheet/src/workers/BaseWorkerClient.ts`~~ (scenario-editorからコピー)
  - [x] ~~`apps/character-sheet/src/workers/db.worker.ts`~~ 作成
  - [x] ~~`apps/character-sheet/src/workers/dbWorkerClient.ts`~~ 作成
  - [x] ~~`apps/character-sheet/src/workers/types/handlerMaps.ts`~~ 型定義作成

- [x] ~~PlayerCharacterハンドラー実装~~ ✅ **完了**
  - [x] ~~`apps/character-sheet/src/entities/playerCharacter/workers/playerCharacterRdbHandlers.ts`~~ (RDB操作)
  - [x] ~~`apps/character-sheet/src/entities/playerCharacter/workers/playerCharacterGraphHandlers.ts`~~ (GraphDB操作)

- [x] ~~BattleCommandハンドラー実装~~ ✅ **完了**
  - [x] ~~`apps/character-sheet/src/entities/battleCommand/workers/battleCommandGraphHandlers.ts`~~ (GraphDB操作)

#### 4-8. API層のWorker対応 ✅ **完了**

**実施内容:**
- Worker基盤実装完了（BaseWorkerClient, db.worker.ts, dbWorkerClient.ts, handlerMaps.ts）
- Workerハンドラー実装完了（RDB/GraphDB）
- **API層をfetch()からWorker通信に変換完了**

##### 変換が必要なファイル

1. **playerCharacterRdbApi.ts**
   ```typescript
   // ❌ 現在の実装（fetch使用）
   export const playerCharacterRdbApi = {
     async create(data: PlayerCharacterFormData): Promise<SerializablePlayerCharacter> {
       const response = await fetch(`${API_BASE_URL}/player-characters`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data),
       });
       return response.json();
     },
     // ... その他のメソッド
   };

   // ✅ 変換後（Worker使用）
   import { dbWorkerClient } from '@/workers/dbWorkerClient';

   export const playerCharacterRdbApi = {
     create: (data: PlayerCharacterFormData) =>
       dbWorkerClient.request('playerCharacter:create', data),
     findAll: () =>
       dbWorkerClient.request('playerCharacter:getList'),
     findById: (id: string) =>
       dbWorkerClient.request('playerCharacter:getById', { id }),
     update: (id: string, data: UpdatePlayerCharacterData) =>
       dbWorkerClient.request('playerCharacter:update', { id, ...data }),
     delete: (id: string) =>
       dbWorkerClient.request('playerCharacter:delete', { id }),
   };
   ```

2. **playerCharacterGraphApi.ts**
   ```typescript
   // ❌ 現在の実装（fetch使用）
   export const playerCharacterGraphApi = {
     async create(id: string): Promise<void> {
       const response = await fetch(`${API_BASE_URL}/graph/player-characters`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id }),
       });
       // ...
     },
     // ...
   };

   // ✅ 変換後（Worker使用）
   import { dbWorkerClient } from '@/workers/dbWorkerClient';

   export const playerCharacterGraphApi = {
     create: (id: string) =>
       dbWorkerClient.request('playerCharacter:createNode', { id }),
     delete: (id: string) =>
       dbWorkerClient.request('playerCharacter:deleteNode', { id }),
     getBattleCommands: (characterId: string) =>
       dbWorkerClient.request('playerCharacter:getBattleCommands', { id: characterId }),
   };
   ```

3. **battleCommandGraphApi.ts**
   ```typescript
   // ❌ 現在の実装（fetch使用）
   export const battleCommandGraphApi = {
     async create(data: BattleCommandFormData & { id: string }): Promise<GraphDbBattleCommandNode> {
       const response = await fetch(`${API_BASE_URL}/graph/battle-commands`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data),
       });
       return response.json();
     },
     // ...
   };

   // ✅ 変換後（Worker使用）
   import { dbWorkerClient } from '@/workers/dbWorkerClient';

   export const battleCommandGraphApi = {
     create: (data: BattleCommandFormData) =>
       dbWorkerClient.request('battleCommand:create', data),
     checkDuplicate: (characterId: string, className: string, commandName: string) =>
       dbWorkerClient.request('battleCommand:checkDuplicate', { characterId, className, commandName }),
     linkToCharacter: (characterId: string, commandId: string, sortOrder: number) =>
       dbWorkerClient.request('battleCommand:linkToCharacter', { characterId, commandId, sortOrder }),
     unlinkFromCharacter: (characterId: string, commandId: string) =>
       dbWorkerClient.request('battleCommand:unlinkFromCharacter', { characterId, commandId }),
     updateSortOrder: (characterId: string, commandId: string, sortOrder: number) =>
       dbWorkerClient.request('battleCommand:updateSortOrder', { characterId, commandId, sortOrder }),
     delete: (commandId: string) =>
       dbWorkerClient.request('battleCommand:delete', { id: commandId }),
   };
   ```

##### 変換作業チェックリスト
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/api/playerCharacterRdbApi.ts` 変換~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/playerCharacter/api/playerCharacterGraphApi.ts` 変換~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/battleCommand/api/battleCommandGraphApi.ts` 変換~~ ✅ **完了**
- [x] ~~Lint・型チェック実行（`bun run lint`）~~ ✅ **完了**

##### 追加で必要だった対応
- [x] ~~`packages/rdb/src/index.ts`に`playerCharacterRepository`のエクスポート追加~~ ✅ **完了**
- [x] ~~`packages/schema/src/playerCharacter.ts`にWorkerハンドラー用パース関数追加~~ ✅ **完了**
  - `parsePlayerCharacterFormData`
  - `parseUpdatePlayerCharacterData`
  - `parsePlayerCharacterId`
- [x] ~~`packages/schema/src/battleCommand.ts`にWorkerハンドラー用パース関数追加~~ ✅ **完了**
  - `parseBattleCommandFormData`
  - `parseBattleCommandId`
  - `parseCheckDuplicateBattleCommandPayload`
  - `parseUpdateSortOrderPayload`
- [x] ~~`apps/character-sheet/src/workers/types.ts`作成~~ ✅ **完了**
- [x] ~~`apps/character-sheet/src/entities/battleCommand/actions/battleCommandActions.ts`修正~~ ✅ **完了**
  - ID生成をWorkerハンドラー側に移動

##### 参考実装
`apps/scenario-editor/src/entities/scenario/api/scenarioApi.ts`:
```typescript
import { dbWorkerClient } from '@/workers/dbWorkerClient';

export const scenarioApi = {
  getList: () => dbWorkerClient.request('scenario:getList'),
  create: (params: { id: string; title: string }) =>
    dbWorkerClient.request('scenario:create', params),
  update: (id: string, data: { title: string }) =>
    dbWorkerClient.request('scenario:update', { id, data }),
  delete: (id: string) => dbWorkerClient.request('scenario:delete', { id }),
};
```

##### 注意点
- Worker通信では、payloadが`unknown`型で渡されるため、各ハンドラーでパース関数を使ってバリデーション
- `dbWorkerClient.request()`の戻り値の型は`GlobalHandlerMap`で自動推論される
- fetch()のエラーハンドリング（response.okチェックなど）は不要（Workerハンドラー側でthrowされる）

### フェーズ5: UI層 ✅ **完了**

#### 5-1. UI コンポーネント実装
- [x] ~~`packages/ui/src/entities/playerCharacter/types.ts` 作成~~ ✅ **完了**
- [x] ~~`packages/ui/src/entities/playerCharacter/PlayerCharacterList.tsx` 作成~~ ✅ **完了**
- [x] ~~`packages/ui/src/entities/playerCharacter/PlayerCharacterCreateModal.tsx` 作成~~ ✅ **完了**
- [x] ~~`packages/ui/src/entities/playerCharacter/BattleCommandList.tsx` 作成~~ ✅ **完了**
- [x] ~~`packages/ui/src/entities/playerCharacter/BattleCommandForm.tsx` 作成~~ ✅ **完了**
- [x] ~~`packages/ui/src/entities/playerCharacter/index.ts` 作成~~ ✅ **完了**
- [x] ~~`packages/ui/src/index.ts`にエクスポート追加~~ ✅ **完了**
- [x] ~~Lint・型チェック実行（`bun run lint`）~~ ✅ **完了**

#### 実装内容
1. **PlayerCharacterList** - プレイヤーキャラクター一覧表示
   - キャラクター名、作成日表示
   - 新規作成ボタン
   - 削除ボタン

2. **PlayerCharacterCreateModal** - プレイヤーキャラクター作成モーダル
   - 名前入力フィールド
   - バリデーション
   - ローディング状態対応

3. **BattleCommandList** - バトルコマンド一覧表示
   - クラス、コマンド名、CP表示
   - タイミング、コスト、射程、対象の詳細表示
   - 効果、タグ表示
   - 追加・削除ボタン

4. **BattleCommandForm** - バトルコマンド作成フォーム
   - 全フィールド入力（クラス、名前、CP、タイミング、コスト、射程、対象、効果、フレーバー、タグ、詳細）
   - タグのカンマ区切り入力対応
   - バリデーション

### フェーズ6: Feature層
✅ **完了済み**

#### 6-1. Feature Hook実装
- [x] ~~`apps/character-sheet/src/features/playerCharacterBattleCommandManagement/hooks/useBattleCommandManagement.ts` 作成~~ ✅ **完了**

#### 6-2. Feature Actions実装
- [x] ~~`apps/character-sheet/src/features/playerCharacterBattleCommandManagement/actions/battleCommandManagementActions.ts` 作成~~ ✅ **完了**

### フェーズ7: Page層
✅ **完了済み**

#### 7-1. Page実装
- [x] ~~`apps/character-sheet/src/pages/player-character/ui/Page.tsx` 作成~~ ✅ **完了**

#### 7-2. ルーティング追加
- [x] ~~`apps/character-sheet/src/app/Router.tsx` に `/player-character` ルート追加~~ ✅ **完了**

#### 7-3. Redux Store設定
- [x] ~~`apps/character-sheet/src/app/store/index.ts` にreducers追加~~ ✅ **完了**
  - `playerCharacter` reducer
  - `battleCommand` reducer

### フェーズ8: GraphDB永続化対応
✅ **完了済み（2025-11-30）**

#### 8-1. KuzuDBのnull問題対応
- [x] ~~`packages/schema/src/battleCommand.ts` 修正~~ ✅ **完了**
  - `GraphDbBattleCommandRawSchema`で`OptionalToStringSchema`を使用
  - KuzuDBが空文字列をnullとして復元する問題に対応

#### 8-2. save/load機能実装
- [x] ~~`apps/character-sheet/src/workers/dbWorkerClient.ts` 実装~~ ✅ **完了**
  - `save()` / `load()` メソッド追加
  - `saveNode()` / `saveEdge()` / `loadTable()` 実装
- [x] ~~`apps/character-sheet/src/workers/db.worker.ts` 実装~~ ✅ **完了**
  - `graphdb:save` / `graphdb:load` ハンドラー追加
  - GraphDB変更操作後の自動save実装

#### 8-3. 初期化時のデータロード
- [x] ~~`dbWorkerClient.onInitialize()` でload実行~~ ✅ **完了**

#### 8-4. 動作確認
- [x] ~~バトルコマンド追加後のF5でデータが永続化されることを確認~~ ✅ **完了**

### フェーズ9: プレイヤーキャラクター更新機能（2025-11-30追加）

#### 9-1. データ層（Repository）
- [ ] `packages/rdb/src/queries/playerCharacterRepository.ts` に `update()` メソッド追加
  - `UPDATE player_characters SET name = ?, updated_at = NOW() WHERE id = ?`
- [ ] `packages/graphdb/src/queries/playerCharacterRepository.ts` に `update()` メソッド追加
  - `MATCH (pc:PlayerCharacter {id: $id}) SET pc.name = $name`
- [ ] ユニットテスト追加
  - `packages/rdb/src/queries/playerCharacterRepository.test.ts` に更新テスト
  - `packages/graphdb/src/queries/playerCharacterRepository.test.ts` に更新テスト

#### 9-2. Entity層（API・Redux）
- [ ] `apps/character-sheet/src/entities/playerCharacter/api/playerCharacterRdbApi.ts` に `update()` 追加
- [ ] `apps/character-sheet/src/entities/playerCharacter/api/playerCharacterGraphApi.ts` に `update()` 追加
- [ ] `apps/character-sheet/src/entities/playerCharacter/model/playerCharacterSlice.ts` に `updateCharacter` action追加
- [ ] `apps/character-sheet/src/entities/playerCharacter/hooks/useUpdatePlayerCharacter.ts` 作成
  - モーダル開閉状態管理
  - 更新フォーム状態管理
  - RDB + GraphDB両方を更新
  - Redux状態更新

#### 9-3. Worker層（永続化対応）
- [ ] `apps/character-sheet/src/entities/playerCharacter/workers/playerCharacterGraphHandlers.ts` に `playerCharacter:update` ハンドラー追加
- [ ] `apps/character-sheet/src/entities/playerCharacter/workers/playerCharacterRdbHandlers.ts` に `playerCharacter:update` ハンドラー追加
- [ ] `apps/character-sheet/src/workers/types/handlerMaps.ts` の型定義更新

#### 9-4. UI層
- [ ] `packages/ui/src/entities/playerCharacter/PlayerCharacterUpdateModal.tsx` 作成
  - PlayerCharacterCreateModalと同様の構造
  - 初期値として既存のキャラクター名を表示
  - バリデーション（名前必須）
- [ ] `packages/ui/src/entities/playerCharacter/PlayerCharacterList.tsx` に編集ボタン追加
  - `onEdit?: (character: PlayerCharacter) => void` props追加
  - 各キャラクター行に「編集」ボタン追加
- [ ] `packages/ui/src/entities/playerCharacter/types.ts` エクスポート確認

#### 9-5. Page層統合
- [ ] `apps/character-sheet/src/pages/player-character/ui/Page.tsx` 更新
  - `useUpdatePlayerCharacter()` hook使用
  - `PlayerCharacterUpdateModal` コンポーネント追加
  - `PlayerCharacterList` の `onEdit` props実装

#### 9-6. テスト
- [ ] ユニットテスト実行・全テスト通過確認
  - RDB: `playerCharacterRepository.test.ts` 更新テスト
  - GraphDB: `playerCharacterRepository.test.ts` 更新テスト
- [ ] lint・型チェック実行
- [ ] BDDテスト追加
  - `apps/character-sheet/tests/features/player-character.feature` に更新シナリオ追加
  - `apps/character-sheet/tests/steps/player-character.steps.ts` に更新ステップ定義追加
- [ ] BDDテスト実行・全シナリオ通過確認

### フェーズ10: テスト（既存・一部完了）

#### 10-1. BDD テスト
- [x] ~~`apps/character-sheet/tests/features/player-character.feature` 作成~~ ✅ **完了（2025-11-30）**
  - プレイヤーキャラクター新規作成シナリオ
  - プレイヤーキャラクター削除シナリオ
- [x] ~~`apps/character-sheet/tests/steps/player-character.steps.ts` 作成~~ ✅ **完了（2025-11-30）**
- [x] ~~`apps/character-sheet/tests/steps/common.steps.ts` 作成~~ ✅ **完了（2025-11-30）**

#### 10-2. テスト実行
- [x] ~~ユニットテスト実行・全テスト通過確認~~ ✅ **完了**
  - `packages/rdb/src/queries/playerCharacterRepository.test.ts` (5 tests passed)
  - `packages/graphdb/src/queries/playerCharacterRepository.test.ts` (5 tests passed)
  - `packages/graphdb/src/queries/battleCommandRepository.test.ts` (7 tests passed)
- [x] ~~lint・型チェック実行~~ ✅ **完了**
- [x] ~~BDDテスト実行（新規作成・削除シナリオ）~~ ✅ **完了（2025-11-30）**
  - 2 scenarios (2 passed)
  - 15 steps (15 passed)
- [ ] BDDテスト実行・全シナリオ通過確認（更新・バトルコマンド・永続化含む）

## データフロー

### キャラクター作成フロー
```
UI (PlayerCharacterCreateModal)
  ↓ onCreate(name)
Redux State (playerCharacterSlice)
  ↓ createPlayerCharacterAction(name)
    1. RDB API: playerCharacterRdbApi.create(name)
       → RDB: INSERT INTO player_characters
       → characterId取得
    2. GraphDB API: playerCharacterGraphApi.create(characterId, name)
       → GraphDB: CREATE (pc:PlayerCharacter {id, name})
    3. Redux: playerCharacterSlice.addCharacter(character)
  ↓
UI: 一覧に新しいキャラクター表示
```

### キャラクター更新フロー（2025-11-30追加）
```
UI (PlayerCharacterUpdateModal)
  ↓ onUpdate(id, name)
Redux State (playerCharacterSlice)
  ↓ updatePlayerCharacterAction(id, name)
    1. RDB API: playerCharacterRdbApi.update(id, name)
       → RDB: UPDATE player_characters SET name = ?, updated_at = NOW() WHERE id = ?
    2. GraphDB API: playerCharacterGraphApi.update(id, name)
       → GraphDB: MATCH (pc:PlayerCharacter {id: $id}) SET pc.name = $name
    3. Worker: dbWorkerClient.request('playerCharacter:update', { id, name })
       → GraphDB永続化（save）
    4. Redux: playerCharacterSlice.updateCharacter({ id, name })
  ↓
UI: 一覧のキャラクター名が更新される
```

### バトルコマンド追加フロー
```
UI (BattleCommandForm)
  ↓ onAddCommand(characterId, commandData: BattleCommand)
Redux State (battleCommandSlice)
  ↓ createBattleCommandAction(characterId, commandData)
    1. 重複チェック
       ↓ battleCommandGraphApi.checkDuplicate(characterId, commandData.class, commandData.name)
       → GraphDB: MATCH (pc:PlayerCharacter)-[:HAS_BATTLE_COMMAND]->(bc:BattleCommand)
                  WHERE pc.id = characterId AND bc.class = class AND bc.name = name
       → 重複あり: エラーを返す（処理中断）
       → 重複なし: 次のステップへ

    2. バトルコマンド作成（ID発番）
       ↓ battleCommandGraphApi.create(commandData)
       → GraphDB: CREATE (bc:BattleCommand {id: uuid(), ...commandData})
       → commandId取得

    3. プレイヤーキャラクターと紐付け
       ↓ battleCommandGraphApi.linkToCharacter(characterId, commandId, sortOrder)
       → GraphDB: CREATE (pc)-[:HAS_BATTLE_COMMAND {sortOrder}]->(bc)

    4. Redux状態更新
       ↓ battleCommandSlice.addCommand(characterId, command)
  ↓
UI: コマンドリストに新しいコマンド表示

エラーハンドリング:
- 重複エラー: "このコマンドは既に取得済みです"
```

## 技術スタック

### フロントエンド
- **React**: UI構築
- **Redux Toolkit**: 状態管理
- **React Router**: ルーティング
- **Valibot**: スキーマバリデーション

### バックエンド（ブラウザローカル）
- **PostgreSQL (PGLite)**: RDB（IndexedDB上で動作）
- **KùzuDB**: GraphDB（IndexedDB上で動作）
- **Drizzle ORM**: RDB操作

### テスト
- **Vitest**: ユニットテスト
- **Cucumber**: BDDテスト
- **Playwright**: E2Eテスト

## 開発時の注意事項

1. **改行コード**: 全ファイルをLFで作成
2. **Feature-Sliced Design**: entity → feature → page の依存関係を守る
3. **テスト駆動**: 各層の実装後、必ずユニットテストを作成
4. **型安全性**: Valibotスキーマを活用し、型安全性を確保
5. **既存パターンの踏襲**: scenario-editorの実装パターンに沿う

## 完了基準

### 必須項目
- [x] ~~全ユニットテスト通過~~ ✅ **完了**
  - RDB: `playerCharacterRepository.test.ts` (5 tests)
  - GraphDB: `playerCharacterRepository.test.ts` (5 tests)
  - GraphDB: `battleCommandRepository.test.ts` (7 tests)
- [ ] 全BDDテスト通過（未実施）
- [x] ~~lint・型チェックエラーなし~~ ✅ **完了**
- [x] ~~ビルドエラーなし~~ ✅ **完了**

### 機能確認
- [x] ~~プレイヤーキャラクターのCRUD操作が正常動作~~ ✅ **完了**
- [x] ~~バトルコマンドの追加・削除が正常動作~~ ✅ **完了**
- [x] ~~**バトルコマンド重複チェックが正常動作**（同じコマンドを2回追加できないこと）~~ ✅ **完了**
- [x] ~~データの永続化が正常動作（ページリロード後も保持）~~ ✅ **完了**
  - GraphDBデータのIndexedDB永続化実装完了
  - F5後もバトルコマンドが保持されることを確認
- [x] ~~GraphDBとRDBの整合性が保たれている~~ ✅ **完了**
  - 同一IDをRDB/GraphDBで使用する設計に修正完了

## 参考資料

- [CLAUDE.md](../../CLAUDE.md) - プロジェクト全体の構造
- [scenario-editor実装](../../apps/scenario-editor/src/entities/character/) - 既存の実装パターン
- [Feature-Sliced Design](https://feature-sliced.design/) - アーキテクチャガイドライン
