# Rulebook App

ECHO-500 TRPGのルールブックアプリケーション（React版）

## 技術スタック

- **React 19** - UIフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS v4** - スタイリング（CSS変数ベース）
- **React Router v7** - ルーティング
- **Mermaid** - 図表描画
- **Vite (Rolldown)** - ビルドツール
- **React Compiler** - 自動最適化

## 開発

```bash
# 開発サーバー起動
bun run dev

# ビルド
bun run build

# Lint + 型チェック
bun run lint

# プレビュー
bun run preview
```

## プロジェクト構造

Feature-Sliced Design (FSD) アーキテクチャを採用しています。

```
src/
├── app/          # アプリケーション初期化・ルーティング
│   └── router.tsx
├── pages/        # ページコンポーネント
│   ├── home/     # ホームページ（実装済み）
│   ├── tutorial/
│   ├── glossary/
│   └── ...
└── index.tsx     # エントリーポイント
```

## UIコンポーネント

共通UIコンポーネントは `packages/ui/src/rulebook` に配置されています。

### 利用可能なコンポーネント

```typescript
import {
  RulebookLayout,      // レイアウト（Header/Footer付き）
  RulebookHeader,      // ヘッダー
  RulebookFooter,      // フッター
  RulebookNavigation,  // サイドバーナビゲーション
  CommandCard,         // コマンドカード
} from '@echo-500/ui';
```

### テーマ

Echo:500独自のポストアポカリプス × サイバーパンクテーマを使用：
- CSS変数ベースのテーマシステム
- ダークモード強制
- サイバーグリッド背景エフェクト
- スキャンラインアニメーション

## 実装状況

### 完了
- ✅ プロジェクト構造
- ✅ ルーティング設定
- ✅ Layout（Header/Footer/Background）
- ✅ Navigation（8カテゴリー、30+リンク）
- ✅ HomePage（Hero/Intro/Warning）
- ✅ モバイル対応（レスポンシブ）
- ✅ Storybook ストーリー

### TODO
- ⏳ チュートリアルページ
- ⏳ 用語集ページ
- ⏳ キャラクター作成ページ
- ⏳ 戦闘ルールページ
- ⏳ その他のコンテンツページ

## ビルド出力

```
../dist/rulebook/assets/index-*.js         43.37 kB │ gzip:   9.86 kB
../dist/rulebook/assets/react-*.js        373.31 kB │ gzip: 119.36 kB
../dist/rulebook/assets/vendor-*.js       479.86 kB │ gzip: 152.19 kB
```

## 移行元

本プロジェクトは `apps/rulebook-solid` (SolidJS版) から移行されました。
