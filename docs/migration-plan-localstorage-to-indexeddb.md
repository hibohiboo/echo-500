# LocalStorage → IndexedDB移行 & FSDリファクタリング計画

**作成日**: 2025-11-30
**対象ブランチ**: `id/16/refactor-add-unittest`
**現在のコミット**: `7bb6afe` fix 実装完了 #16

---

## 1. 現状分析

### 1.1 実装パターンの二重管理

現在、キャラクター管理機能が2パターン存在：

| 項目 | LocalStorageパターン | IndexedDBパターン |
|------|-------------------|-----------------|
| **URL** | `/`, `/new`, `/edit/:id`, `/character/:id` | `/player-character` |
| **Page** | `page/character-*` (FSD準拠) | `pages/player-character` (FSD不完全) |
| **Feature** | `feature/characterManagement` (単数形) | `features/playerCharacterBattleCommandManagement` (複数形) |
| **Entity** | `entities/character` | `entities/playerCharacter` |
| **Storage** | LocalStorage | IndexedDB (Web Worker経由) |
| **API** | `characterApi.ts` (LocalStorage直接) | `playerCharacterRdbApi.ts` (dbWorkerClient) |
| **機能** | 基本CRUD + Memory Slots | CRUD + BattleCommand管理 |

### 1.2 問題点

#### A. ディレクトリ構造の不統一
```
apps/character-sheet/src/
├── page/           # FSD準拠（LocalStorageパターン）
├── pages/          # 非FSD（IndexedDBパターン）
├── feature/        # 単数形
└── features/       # 複数形
```

#### B. Feature層の設計ミス
- **LocalStorageパターン**: `feature/characterManagement` に全ロジックが集約（正しい）
- **IndexedDBパターン**: `features/playerCharacterBattleCommandManagement` が存在するが、Pageが直接Entity層を使用（FSD違反）

#### C. ストレージ実装の分散
- LocalStorage: 同期的、シンプル、テスト困難
- IndexedDB: 非同期、Web Worker、テスト可能、トランザクション対応

---

## 2. 移行方針

### 2.1 基本方針

1. **UI層は LocalStorageパターン (`page/character-*`) を採用**
   - 理由: FSD準拠、loaderパターン採用、既存UIの成熟度

2. **ストレージ層は IndexedDBパターン (`playerCharacterRdbApi`) を採用**
   - 理由: 非同期、大量データ対応、トランザクション、テスト容易

3. **FSD準拠のディレクトリ構造に統一**
   - `page/` (単数形) に統一
   - `feature/` (単数形) に統一

4. **段階的移行**（破壊的変更を避ける）
   - Phase 1: IndexedDB API層の整備
   - Phase 2: Feature層の統合
   - Phase 3: Page層の統合
   - Phase 4: 旧実装の削除

---

## 3. 詳細実装計画

### Phase 1: データ層の統一

#### 1.1 Entity層のマージ

**目標**: `entities/character` を IndexedDB対応に変更

```
entities/character/
├── api/
│   ├── characterRdbApi.ts          # 新規作成（playerCharacterRdbApiをベース）
│   └── characterApi.ts              # 削除（LocalStorage廃止）
├── model/
│   ├── types.ts                     # Character型の統一
│   └── characterSlice.ts            # Redux状態管理（新規作成）
├── hooks/
│   ├── useCharacterList.ts          # IndexedDB対応
│   ├── useCreateCharacter.ts        # 新規作成
│   ├── useUpdateCharacter.ts        # 新規作成
│   └── useDeleteCharacter.ts        # 新規作成
├── actions/
│   └── characterActions.ts          # 新規作成（Redux操作付きCRUD）
└── workers/
    └── characterRdbHandlers.ts      # 新規作成（Worker handlers）
```

**作業内容**:
- [ ] `entities/character/model/types.ts` を `@echo-500/schema` の `SerializablePlayerCharacter` と統合
- [ ] `entities/character/api/characterRdbApi.ts` 作成（`playerCharacterRdbApi.ts` をコピー・リネーム）
- [ ] `entities/character/workers/characterRdbHandlers.ts` 作成（`playerCharacterRdbHandlers.ts` をコピー・リネーム）
- [ ] dbWorkerClient に `character:*` メッセージハンドラー追加
- [ ] `entities/character/model/characterSlice.ts` 作成（Redux状態管理）
- [ ] `entities/character/actions/characterActions.ts` 作成（CRUD + Redux更新）
- [ ] `entities/character/hooks/*` を IndexedDB対応に変更

#### 1.2 BattleCommand関連の整理

**方針**: BattleCommandは別Entityとして独立させる

```
entities/battleCommand/
├── api/
│   └── battleCommandRdbApi.ts       # 抽出
├── model/
│   ├── types.ts                     # BattleCommand型定義
│   └── battleCommandSlice.ts        # Redux状態管理
├── actions/
│   └── battleCommandActions.ts      # CRUD操作（Redux操作なし）
└── workers/
    └── battleCommandRdbHandlers.ts
```

---

### Phase 2: Feature層の統合

#### 2.1 characterManagement Feature の拡張

**目標**: 既存の `feature/characterManagement` を IndexedDB対応に変更

```
feature/characterManagement/
├── hooks/
│   ├── useCharacterList.ts          # 既存（軽微な修正）
│   ├── useCharacterForm.ts          # 既存（API変更対応）
│   ├── useCharacterDetail.ts        # 既存（API変更対応）
│   ├── useMemorySlots.ts            # 既存
│   ├── useBattleStylesForm.ts       # 既存
│   └── useBattleFrameForm.ts        # 既存
├── ui/
│   ├── CharacterListView.tsx        # 既存
│   ├── CharacterFormView.tsx        # 既存
│   └── CharacterDetailView.tsx      # 既存
└── actions/
    └── characterManagementActions.ts # 新規作成（必要に応じて）
```

**作業内容**:
- [ ] hooks内の `characterApi` インポートを `characterRdbApi` に変更
- [ ] 同期処理を非同期処理に変更（async/await対応）
- [ ] Loader関数の非同期対応

#### 2.2 BattleCommand Feature の新規作成

**目標**: BattleCommand管理をFeature層として独立

```
feature/characterBattleCommandManagement/
├── hooks/
│   └── useBattleCommandManagement.ts # 既存を移動
├── actions/
│   └── battleCommandManagementActions.ts # 既存を移動
└── ui/
    └── BattleCommandSection.tsx       # 新規作成（PlayerCharacterPageから抽出）
```

**作業内容**:
- [ ] `features/playerCharacterBattleCommandManagement/*` を移動
- [ ] Entity層の依存関係修正（`playerCharacter` → `character` + `battleCommand`）
- [ ] Redux操作を Actions に集約

---

### Phase 3: Page層の統合

#### 3.1 `/player-character` ルートの廃止

**目標**: `/player-character` を `/` に統合

**作業内容**:
- [ ] `page/character-list/Page.tsx` に BattleCommand機能を追加
- [ ] `page/character-detail/Page.tsx` に BattleCommand機能を追加
- [ ] `pages/player-character/` ディレクトリを削除
- [ ] ルート定義から `/player-character` を削除

#### 3.2 Loader関数の非同期対応

```typescript
// page/character-list/loader.ts
export async function characterListLoader() {
  const characters = await characterRdbApi.findAll();
  return characters;
}

// page/character-form/loader.ts
export async function characterFormLoader({ params }: LoaderFunctionArgs) {
  if (!params.id) return null;
  const character = await characterRdbApi.findById(params.id);
  return character;
}

// page/character-detail/loader.ts
export async function characterDetailLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) throw new Error('Character ID is required');

  const character = await characterRdbApi.findById(id);
  const battleCommands = await battleCommandRdbApi.findByCharacterId(id);

  return { character, battleCommands };
}
```

---

### Phase 4: クリーンアップ

#### 4.1 旧実装の削除

- [ ] `entities/playerCharacter/` ディレクトリ削除
- [ ] `features/` ディレクトリ削除（`feature/` に統一）
- [ ] `pages/` ディレクトリ削除（`page/` に統一）
- [ ] `entities/character/api/characterApi.ts` 削除（LocalStorage版）

#### 4.2 型定義の統一

- [ ] `@echo-500/schema` の `SerializablePlayerCharacter` を `Character` にリネーム
- [ ] Memory Slots関連の型を追加

#### 4.3 テストの更新

- [ ] Entity層のユニットテスト更新
- [ ] Feature層の統合テスト更新
- [ ] BDDテストの更新（LocalStorage → IndexedDB）

---

## 4. データマイグレーション

### 4.1 LocalStorage → IndexedDB 移行ツール

```typescript
// migration/migrateLocalStorageToIndexedDB.ts
export async function migrateCharacters() {
  const legacyData = localStorage.getItem('characters');
  if (!legacyData) return;

  const characters: Character[] = JSON.parse(legacyData);

  for (const character of characters) {
    await characterRdbApi.create(character.id, {
      name: character.name,
      memorySlots: character.memorySlots,
    });
  }

  // バックアップ
  localStorage.setItem('characters_backup', legacyData);
  localStorage.removeItem('characters');
}
```

### 4.2 マイグレーション実行タイミング

アプリケーション起動時に自動実行:

```typescript
// app/App.tsx
useEffect(() => {
  const runMigration = async () => {
    const migrated = localStorage.getItem('migration_completed');
    if (!migrated) {
      await migrateCharacters();
      localStorage.setItem('migration_completed', 'true');
    }
  };
  runMigration();
}, []);
```

---

## 5. リスク管理

### 5.1 破壊的変更の最小化

- **段階的リリース**: Phase単位でPR作成
- **フィーチャーフラグ**: 環境変数で新旧実装の切り替え可能に

### 5.2 ロールバック戦略

- **データバックアップ**: マイグレーション前にLocalStorageをバックアップ
- **復元機能**: `characters_backup` からの復元機能を提供

### 5.3 テスト戦略

- [ ] Phase 1完了後: Entity層のユニットテスト全通過
- [ ] Phase 2完了後: Feature層の統合テスト全通過
- [ ] Phase 3完了後: BDDテスト全通過
- [ ] Phase 4完了後: E2Eテスト全通過

---

## 6. 実装スケジュール

### Phase 1: データ層の統一（2-3日）
- Entity層のマージ
- Worker handlers作成
- ユニットテスト作成

### Phase 2: Feature層の統合（1-2日）
- characterManagement Feature更新
- BattleCommand Feature作成
- 統合テスト作成

### Phase 3: Page層の統合（1-2日）
- Loader関数の非同期対応
- `/player-character` 廃止
- BDDテスト更新

### Phase 4: クリーンアップ（1日）
- 旧実装削除
- ドキュメント更新
- E2Eテスト実行

**合計**: 5-8日

---

## 7. 完了判定基準

### 必須条件
- [ ] 全ユニットテスト通過
- [ ] 全統合テスト通過
- [ ] 全BDDテスト通過
- [ ] E2Eテスト通過
- [ ] lint・型チェック通過
- [ ] ビルドエラーなし
- [ ] データマイグレーション動作確認

### 品質基準
- [ ] FSD準拠のディレクトリ構造
- [ ] Entity間の依存関係なし
- [ ] Feature層が複数Entityを適切に組み合わせ
- [ ] Page層がシンプル（100行以内）

### ドキュメント
- [ ] CLAUDE.md更新（実装パターン記載）
- [ ] マイグレーションガイド作成
- [ ] 証跡記録完了

---

## 8. 参考情報

### 既存実装の参照先

- **LocalStorageパターン**: `apps/character-sheet/src/page/character-*`, `feature/characterManagement`
- **IndexedDBパターン**: `apps/character-sheet/src/entities/playerCharacter`, `features/playerCharacterBattleCommandManagement`
- **FSD準拠例**: `apps/scenario-editor/src/` (TRPG Scenario Maker)

### 技術スタック
- **状態管理**: Redux Toolkit
- **ストレージ**: IndexedDB (via Web Worker)
- **ルーティング**: React Router v7
- **型検証**: Valibot (`@echo-500/schema`)
