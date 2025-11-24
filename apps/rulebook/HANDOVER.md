# Rulebook React移行 - 引継ぎドキュメント

## 実装完了内容

### 完了ページ
1. ✅ **TutorialPage** - インベントリシステム統合（8ステップ、インタラクティブ）
2. ✅ **GlossaryPage** - 用語集（6用語の詳細解説）
3. ✅ **ScenarioCreatorsPage** - シナリオ製作者向けガイド（7つのアーキタイプ）

### 1. 新規作成したUIコンポーネント（packages/ui/src/rulebook/）

以下の7つのコンポーネントを作成し、React化が完了しました：

| コンポーネント | パス | 役割 |
|--------------|------|------|
| `InventoryIcon` | `inventory-icon/InventoryIcon.tsx` | アイコン表示（文字列またはReactNode対応） |
| `TutorialSection` | `tutorial-section/TutorialSection.tsx` | チュートリアルセクション（続きボタン付き、スライドインアニメーション） |
| `InventoryCard` | `inventory-card/InventoryCard.tsx` | インベントリカード（実行/詳細ボタン、レアリティ対応） |
| `ItemDetail` | `item-detail/ItemDetail.tsx` | アイテム詳細モーダル（タグ、概要、詳細表示） |
| `InventoryPanel` | `inventory-panel/InventoryPanel.tsx` | インベントリパネル（タブ切り替え、スライドイン、モーダル統合） |
| `ItemToast` | `item-toast/ItemToast.tsx` | アイテム獲得トースト通知（2.5秒表示、アニメーション） |

**エクスポート状況**: `packages/ui/src/index.ts` に全てエクスポート済み

```typescript
// packages/ui/src/index.ts
export { TutorialSection } from './rulebook/tutorial-section';
export { InventoryIcon } from './rulebook/inventory-icon';
export { InventoryCard } from './rulebook/inventory-card';
export { InventoryPanel } from './rulebook/inventory-panel';
export { ItemDetail } from './rulebook/item-detail';
export { ItemToast } from './rulebook/item-toast';
export type { InventoryItem } from './rulebook/inventory-panel';
export type { InventoryIconType } from './rulebook/inventory-icon';
```

### 2. Feature実装（apps/rulebook/src/features/tutorial/）

**TutorialWithInventory** コンポーネント
- **ファイル**: `apps/rulebook/src/features/tutorial/TutorialWithInventory.tsx`
- **エクスポート**: `apps/rulebook/src/features/tutorial/index.ts`
- **機能**:
  - 8ステップのインタラクティブチュートリアル
  - コマンド選択システム（工房 or 塔の2択分岐）
  - インベントリシステム統合（4つの初期メモリー）
  - アイテム獲得時のトースト表示
  - 右下固定のインベントリボタン（⚙アイコン）

**初期インベントリ**:
1. 人間の保護（ロボット工学三原則 第一条）
2. 命令順守（ロボット工学三原則 第二条）
3. 自己保存（ロボット工学三原則 第三条）
4. 目的（破損データ）

**獲得可能アイテム**:
- スキャン（コマンド）- step2で獲得
- 研究所のプレート（アイテム）- step4で獲得

### 3. ページ更新

**Tutorial.tsx** (`apps/rulebook/src/pages/tutorial/Tutorial.tsx`)
```tsx
import { TutorialWithInventory } from '@/features/tutorial';

export function TutorialPage() {
  return (
    <div className="tutorial-page">
      <TutorialWithInventory />
    </div>
  );
}
```

### 4. 画像アセット

- **元ファイル**: `apps/rulebook-solid/public/images/tutorial-1.png`
- **コピー先**: `apps/rulebook/public/images/tutorial-1.png`
- **用途**: チュートリアルstep4で表示される苔むした休眠ポッドの画像

## ビルド状況

### ✅ 成功確認済み

```bash
cd apps/rulebook
bun run lint   # ✅ 合格
bun run build  # ✅ 成功
```

**ビルド出力**:
```
../dist/rulebook/assets/router-PbRHnobd.js        36.03 kB │ gzip:  13.05 kB
../dist/rulebook/assets/index-C_ybAXj1.js         95.48 kB │ gzip:  21.83 kB
../dist/rulebook/assets/react-BV8in1WQ.js        373.31 kB │ gzip: 119.36 kB
../dist/rulebook/assets/vendor-i62HtxaX.js       479.86 kB │ gzip: 152.19 kB
```

## 技術的なポイント

### SolidJS → React 変換パターン

1. **状態管理**:
   ```tsx
   // SolidJS
   const [value, setValue] = createSignal<T>(initial);

   // React
   const [value, setValue] = useState<T>(initial);
   ```

2. **リストレンダリング**:
   ```tsx
   // SolidJS
   <For each={items}>{(item) => <Component {...item} />}</For>

   // React
   {items.map((item) => <Component key={item.id} {...item} />)}
   ```

3. **条件付きレンダリング**:
   ```tsx
   // SolidJS
   <Show when={condition}><Component /></Show>

   // React
   {condition && <Component />}
   ```

4. **CSS属性**:
   - `class` → `className`
   - `classList` → テンプレートリテラル `className={`base ${active ? 'active' : ''}`}`

5. **型定義**:
   - `JSX.Element` → `ReactNode`（React 19対応）
   - `ParentComponent` → `({ children }: { children: ReactNode })`

6. **CSS-in-JS**:
   - SolidJSと同じく `<style>` タグを使用（Reactでも動作）
   - `@scope` ディレクティブ対応

### Feature-Sliced Design準拠

- **絶対パス**: `@/features/tutorial` を使用（ESLintルール `@conarti/feature-sliced/absolute-relative`）
- **依存関係**: Feature層は entities と packages/ui のみに依存

## コンポーネント詳細

### InventoryPanel の主要機能

```tsx
interface InventoryPanelProps {
  isOpen: boolean;           // パネル開閉状態
  items: InventoryItem[];    // インベントリアイテム配列
  onClose: () => void;       // 閉じる時のコールバック
  onExecute: (item: InventoryItem) => void;  // コマンド実行時のコールバック
}
```

**タブ種別**:
- `command` - コマンド（実行ボタン表示）
- `item` - アイテム（詳細のみ）
- `memory` - メモリー（詳細のみ）

**アニメーション**:
- スライドイン: `bottom: -100%` → `bottom: 0`
- トランジション: `cubic-bezier(0.4, 0, 0.2, 1)`

### ItemToast の動作

- **表示時間**: 2.5秒
- **アニメーション**:
  1. フェードイン + スライドアップ（0〜10%）
  2. 静止（10〜70%）
  3. フェードアウト + スライドダウン（70〜100%）

### TutorialSection のボタン表示制御

- デフォルトで全てのボタンを非表示（`visibility: hidden`）
- `:last-of-type` セレクタで最後のセクションのボタンのみ表示
- これにより、複数セクションがあっても最新のものだけボタンが表示される

## 次のステップ候補

### 1. 用語集ページ（Glossary）
- **元ファイル**: `apps/rulebook-solid/src/pages/glossary/Glossary.tsx`
- **実装内容**: 用語のリスト表示、検索機能
- **難易度**: 低（シンプルなリスト表示）

### 2. キャラクター作成ページ
- **元ファイル**: `apps/rulebook-solid/src/pages/character-creation/CharacterCreation.tsx`
- **実装内容**: キャラクター作成フォーム
- **難易度**: 中（フォーム処理）

### 3. 戦闘ルールページ
- **元ファイル**: `apps/rulebook-solid/src/pages/battle-rules/BattleRules.tsx`
- **実装内容**: 戦闘ルール解説
- **難易度**: 中〜高（複雑なレイアウト）

### 4. その他のページ
- Game Master (`game-master/GameMaster.tsx`)
- Scenario Creators (`scenario-creators/ScenarioCreators.tsx`)
- Privacy Policy (`privacy-policy/PrivacyPolicy.tsx`)
- Terms of Service (`terms-of-service/TermsOfService.tsx`)

## ファイル構造

```
apps/rulebook/
├── src/
│   ├── features/
│   │   └── tutorial/
│   │       ├── TutorialWithInventory.tsx  # メインロジック
│   │       └── index.ts
│   └── pages/
│       └── tutorial/
│           └── Tutorial.tsx               # ページエントリーポイント
└── public/
    └── images/
        └── tutorial-1.png                 # 休眠ポッド画像

packages/ui/src/rulebook/
├── inventory-icon/
│   ├── InventoryIcon.tsx
│   └── index.ts
├── tutorial-section/
│   ├── TutorialSection.tsx
│   └── index.ts
├── inventory-card/
│   ├── InventoryCard.tsx
│   └── index.ts
├── item-detail/
│   ├── ItemDetail.tsx
│   └── index.ts
├── inventory-panel/
│   ├── InventoryPanel.tsx
│   └── index.ts
└── item-toast/
    ├── ItemToast.tsx
    └── index.ts
```

## 注意事項

1. **改行コード**: 全ファイルLF（CLAUDE.mdに記載）
2. **FSD準拠**: Feature-Sliced Design アーキテクチャに従う
3. **絶対パス**: `@/` を使用（ESLintルール）
4. **React Compiler**: babel-plugin-react-compiler 有効
5. **CSS変数**: Echo:500テーマの変数を使用
   - `--color-cyber-primary`: #00ffcc
   - `--color-nature-accent`: #8bd346
   - `--font-heading`: 'Orbitron', sans-serif
   - `--font-primary`: 'Share Tech Mono', monospace

## 既知の課題

特になし（全てのビルドとlintが成功）

## テスト方法

```bash
# 開発サーバー起動
cd apps/rulebook
bun run dev

# ブラウザで確認
# http://localhost:5173/rulebook/ にアクセス
# /rulebook/content/tutorial でチュートリアルページを確認
```

**動作確認項目**:
1. ✅ 「自己診断を行う」ボタンで次のステップへ進む
2. ✅ 「機能復旧」で「スキャン」コマンドを獲得、トースト表示
3. ✅ 右下の⚙ボタンでインベントリパネルを開く
4. ✅ インベントリのタブ切り替え（COMMANDS/ITEMS/MEMORY）
5. ✅ カードクリックで詳細モーダル表示
6. ✅ 「塔に向かう」でコマンド選択画面表示
7. ✅ 工房 or 塔を選択して分岐
8. ✅ モバイル表示の確認

## 関連ファイル

- プロジェクトルート: `d:\projects\echo-500\`
- README: `apps/rulebook/README.md`
- 元SolidJS版: `apps/rulebook-solid/`
- 共通UI: `packages/ui/src/rulebook/`
- プロジェクト指針: `CLAUDE.md`

## Git情報

- **ブランチ**: `id/13/reafctorSolidToReact`
- **メインブランチ**: `main`
- **最新コミット** (作業前):
  - `cb3f75b` - add チュートリアル #13
  - `9320920` - add 残り #13
  - `63a9d95` - fix index.css #13

## 完了日時

**作業完了日時**: 2025-11-24
**ビルド状態**: ✅ 成功
**Lint状態**: ✅ 合格
