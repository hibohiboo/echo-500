# Rulebook App

ECHO-500 TRPGのルールブックアプリケーション（React版）

## 技術スタック

- **React** - UIフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **React Router** - ルーティング
- **Mermaid** - 図表描画
- **Vite** - ビルドツール

## 開発

```bash
# 開発サーバー起動
bun run dev

# ビルド
bun run build

# Lint + 型チェック
bun run lint
```

## プロジェクト構造

Feature-Sliced Design (FSD) アーキテクチャを採用しています。

```
src/
├── app/          # アプリケーション初期化・ルーティング
├── pages/        # ページコンポーネント
├── features/     # ビジネス機能
├── entities/     # エンティティ
└── shared/       # 共有ユーティリティ
```

## UIコンポーネント

共通UIコンポーネントは `packages/ui/src/rulebook` に配置されています。
