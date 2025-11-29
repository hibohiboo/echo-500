# プレイヤーキャラクター管理機能 実装計画

## 概要

`apps/rulebook` アプリケーションにプレイヤーキャラクター管理機能を追加する。
既存の `apps/scenario-editor` と同様に、RDB + GraphDB の組み合わせでデータを管理する。

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
  name STRING,
  description STRING,
  commandType STRING,  -- 'attack', 'defense', 'support', 'special'
  PRIMARY KEY (id)
)
```

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
apps/rulebook/
├── src/
│   ├── app/
│   │   ├── router.tsx              # ルーティング定義（更新）
│   │   └── store/                  # Redux store（新規作成）
│   │       ├── index.ts
│   │       └── rootReducer.ts
│   │
│   ├── entities/                   # Entity層（新規作成）
│   │   ├── playerCharacter/
│   │   │   ├── actions/
│   │   │   │   └── playerCharacterActions.ts
│   │   │   ├── api/
│   │   │   │   ├── playerCharacterRdbApi.ts
│   │   │   │   └── playerCharacterGraphApi.ts
│   │   │   ├── hooks/
│   │   │   │   ├── usePlayerCharacterList.ts
│   │   │   │   ├── useCreatePlayerCharacter.ts
│   │   │   │   └── useDeletePlayerCharacter.ts
│   │   │   ├── model/
│   │   │   │   └── playerCharacterSlice.ts
│   │   │   ├── workers/
│   │   │   │   ├── playerCharacterRdbHandlers.ts
│   │   │   │   └── playerCharacterGraphHandlers.ts
│   │   │   └── index.ts
│   │   │
│   │   └── battleCommand/
│   │       ├── actions/
│   │       │   └── battleCommandActions.ts
│   │       ├── api/
│   │       │   └── battleCommandGraphApi.ts
│   │       ├── hooks/
│   │       │   ├── useBattleCommandList.ts
│   │       │   ├── useCreateBattleCommand.ts
│   │       │   └── useDeleteBattleCommand.ts
│   │       ├── model/
│   │       │   └── battleCommandSlice.ts
│   │       ├── workers/
│   │       │   └── battleCommandGraphHandlers.ts
│   │       └── index.ts
│   │
│   ├── feature/                    # Feature層（新規作成）
│   │   └── playerCharacterManagement/
│   │       ├── hooks/
│   │       │   └── usePlayerCharacterManagement.ts
│   │       ├── ui/
│   │       │   └── PlayerCharacterTabContent.tsx
│   │       └── index.ts
│   │
│   └── pages/
│       └── player-character/       # 新規ページ
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
- [ ] `packages/schema/src/playerCharacter.ts` 作成
  ```typescript
  export const PlayerCharacterSchema = v.object({
    id: v.string(),
    name: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
  });
  ```

- [ ] `packages/schema/src/battleCommand.ts` 作成
  ```typescript
  export const BattleCommandSchema = v.object({
    id: v.string(),
    name: v.string(),
    description: v.string(),
    commandType: v.picklist(['attack', 'defense', 'support', 'special']),
  });
  ```

### フェーズ2: データベース層（RDB）

#### 2-1. RDB スキーマ追加
- [ ] `packages/rdb/src/schema.ts` に `playerCharactersTable` 追加
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
- [ ] `bun run db:generate` 実行
- [ ] 生成されたマイグレーションファイル確認

#### 2-3. Repository実装
- [ ] `packages/rdb/src/queries/playerCharacterRepository.ts` 作成
  - `create(name: string): Promise<PlayerCharacter>`
  - `findAll(): Promise<PlayerCharacter[]>`
  - `findById(id: string): Promise<PlayerCharacter | null>`
  - `update(id: string, name: string): Promise<PlayerCharacter>`
  - `delete(id: string): Promise<void>`

#### 2-4. ユニットテスト
- [ ] `packages/rdb/src/queries/playerCharacterRepository.test.ts` 作成

### フェーズ3: データベース層（GraphDB）

#### 3-1. GraphDB スキーマ追加
- [ ] `packages/graphdb/src/schemas.ts` に以下を追加
  - `PlayerCharacter` ノード
  - `BattleCommand` ノード
  - `HAS_BATTLE_COMMAND` リレーション

#### 3-2. Repository実装
- [ ] `packages/graphdb/src/queries/playerCharacterRepository.ts` 作成
  - `create(id: string, name: string): Promise<void>`
  - `findById(id: string): Promise<PlayerCharacter | null>`
  - `update(id: string, name: string): Promise<void>`
  - `delete(id: string): Promise<void>`
  - `getBattleCommands(characterId: string): Promise<BattleCommand[]>`

- [ ] `packages/graphdb/src/queries/battleCommandRepository.ts` 作成
  - `create(params: CreateBattleCommandParams): Promise<BattleCommand>`
  - `linkToCharacter(characterId: string, commandId: string, sortOrder: number): Promise<void>`
  - `unlinkFromCharacter(characterId: string, commandId: string): Promise<void>`
  - `updateSortOrder(characterId: string, commandId: string, sortOrder: number): Promise<void>`

#### 3-3. ユニットテスト
- [ ] `packages/graphdb/src/queries/playerCharacterRepository.test.ts` 作成
- [ ] `packages/graphdb/src/queries/battleCommandRepository.test.ts` 作成

### フェーズ4: フロントエンド Entity層

#### 4-1. API層実装
- [ ] `apps/rulebook/src/entities/playerCharacter/api/playerCharacterRdbApi.ts` 作成
- [ ] `apps/rulebook/src/entities/playerCharacter/api/playerCharacterGraphApi.ts` 作成
- [ ] `apps/rulebook/src/entities/battleCommand/api/battleCommandGraphApi.ts` 作成

#### 4-2. Redux State管理
- [ ] `apps/rulebook/src/entities/playerCharacter/model/playerCharacterSlice.ts` 作成
- [ ] `apps/rulebook/src/entities/battleCommand/model/battleCommandSlice.ts` 作成

#### 4-3. Actions実装
- [ ] `apps/rulebook/src/entities/playerCharacter/actions/playerCharacterActions.ts` 作成
- [ ] `apps/rulebook/src/entities/battleCommand/actions/battleCommandActions.ts` 作成

#### 4-4. Hooks実装
- [ ] `apps/rulebook/src/entities/playerCharacter/hooks/usePlayerCharacterList.ts` 作成
- [ ] `apps/rulebook/src/entities/playerCharacter/hooks/useCreatePlayerCharacter.ts` 作成
- [ ] `apps/rulebook/src/entities/battleCommand/hooks/useBattleCommandList.ts` 作成

#### 4-5. Workers実装
- [ ] `apps/rulebook/src/entities/playerCharacter/workers/playerCharacterRdbHandlers.ts` 作成
- [ ] `apps/rulebook/src/entities/playerCharacter/workers/playerCharacterGraphHandlers.ts` 作成
- [ ] `apps/rulebook/src/entities/battleCommand/workers/battleCommandGraphHandlers.ts` 作成

### フェーズ5: UI層

#### 5-1. UI コンポーネント実装
- [ ] `packages/ui/src/playerCharacter/PlayerCharacterList.tsx` 作成
- [ ] `packages/ui/src/playerCharacter/PlayerCharacterCreateModal.tsx` 作成
- [ ] `packages/ui/src/playerCharacter/BattleCommandList.tsx` 作成
- [ ] `packages/ui/src/playerCharacter/BattleCommandForm.tsx` 作成
- [ ] `packages/ui/src/playerCharacter/types.ts` 作成

### フェーズ6: Feature層

#### 6-1. Feature Hook実装
- [ ] `apps/rulebook/src/feature/playerCharacterManagement/hooks/usePlayerCharacterManagement.ts` 作成

#### 6-2. Feature UI実装
- [ ] `apps/rulebook/src/feature/playerCharacterManagement/ui/PlayerCharacterTabContent.tsx` 作成

### フェーズ7: Page層

#### 7-1. Page実装
- [ ] `apps/rulebook/src/pages/player-character/ui/Page.tsx` 作成

#### 7-2. ルーティング追加
- [ ] `apps/rulebook/src/app/router.tsx` に `/content/player-character` ルート追加

#### 7-3. Redux Store設定
- [ ] `apps/rulebook/src/app/store/index.ts` 作成
- [ ] `apps/rulebook/src/app/store/rootReducer.ts` 作成
- [ ] `apps/rulebook/src/index.tsx` に Provider追加

### フェーズ8: テスト

#### 8-1. BDD テスト
- [ ] `apps/rulebook/tests/features/player-character.feature` 作成
- [ ] `apps/rulebook/tests/steps/player-character.steps.ts` 作成

#### 8-2. テスト実行
- [ ] ユニットテスト実行・全テスト通過確認
- [ ] lint・型チェック実行
- [ ] BDDテスト実行・全シナリオ通過確認

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

### バトルコマンド追加フロー
```
UI (BattleCommandForm)
  ↓ onAddCommand(characterId, commandData)
Redux State (battleCommandSlice)
  ↓ createBattleCommandAction(characterId, commandData)
    1. GraphDB API: battleCommandGraphApi.create(commandData)
       → GraphDB: CREATE (bc:BattleCommand {id, name, description, commandType})
       → commandId取得
    2. GraphDB API: battleCommandGraphApi.linkToCharacter(characterId, commandId, sortOrder)
       → GraphDB: CREATE (pc)-[:HAS_BATTLE_COMMAND {sortOrder}]->(bc)
    3. Redux: battleCommandSlice.addCommand(characterId, command)
  ↓
UI: コマンドリストに新しいコマンド表示
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
- [ ] 全ユニットテスト通過
- [ ] 全BDDテスト通過
- [ ] lint・型チェックエラーなし
- [ ] ビルドエラーなし

### 機能確認
- [ ] プレイヤーキャラクターのCRUD操作が正常動作
- [ ] バトルコマンドの追加・削除が正常動作
- [ ] データの永続化が正常動作（ページリロード後も保持）
- [ ] GraphDBとRDBの整合性が保たれている

## 参考資料

- [CLAUDE.md](../../CLAUDE.md) - プロジェクト全体の構造
- [scenario-editor実装](../../apps/scenario-editor/src/entities/character/) - 既存の実装パターン
- [Feature-Sliced Design](https://feature-sliced.design/) - アーキテクチャガイドライン
