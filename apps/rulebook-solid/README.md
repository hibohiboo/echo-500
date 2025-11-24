# TRPG Rulebook

TRPGシナリオメーカー用のルールブックアプリケーション（SolidJS）

## サイトマップ

```
rulebook/
├── src/
│   ├── pages/
│   │   ├── introduction/          # はじめに
│   │   │   ├── WhatIsTRPG.tsx    # TRPGとは
│   │   │   ├── HowToPlay.tsx     # 遊び方の流れ
│   │   │   └── Terminology.tsx   # 用語集
│   │   │
│   │   ├── basics/                # 基本ルール
│   │   │   ├── DiceRolls.tsx     # ダイスロール
│   │   │   ├── SkillChecks.tsx   # 技能判定
│   │   │   ├── Combat.tsx        # 戦闘ルール
│   │   │   └── SanityCheck.tsx   # 正気度判定
│   │   │
│   │   ├── character/             # キャラクター作成
│   │   │   ├── Creation.tsx      # キャラクター作成手順
│   │   │   ├── Stats.tsx         # 能力値の決定
│   │   │   ├── Skills.tsx        # 技能の割り振り
│   │   │   └── Background.tsx    # 背景設定
│   │   │
│   │   ├── scenarios/             # シナリオ運用
│   │   │   ├── GMGuide.tsx       # GM向けガイド
│   │   │   ├── PlayerGuide.tsx   # PL向けガイド
│   │   │   ├── SessionPrep.tsx   # セッション準備
│   │   │   └── Trouble.tsx       # トラブルシューティング
│   │   │
│   │   ├── advanced/              # 上級ルール
│   │   │   ├── HouseRules.tsx    # ハウスルール例
│   │   │   ├── Variants.tsx      # バリアントルール
│   │   │   └── Customization.tsx # カスタマイズ
│   │   │
│   │   ├── reference/             # リファレンス
│   │   │   ├── QuickReference.tsx # クイックリファレンス
│   │   │   ├── Tables.tsx         # 各種表一覧
│   │   │   └── FAQ.tsx            # よくある質問
│   │   │
│   │   └── legal/                 # 法的文書
│   │       ├── PrivacyPolicy.tsx  # プライバシーポリシー
│   │       └── TermsOfService.tsx # 利用規約
│   │
│   └── app/
│       ├── Router.tsx             # ルーティング設定
│       └── Navigation.tsx         # ナビゲーションUI
```

## ディレクトリ構造方針

### カテゴリ分類
1. **introduction/** - TRPG初心者向けの導入コンテンツ
2. **basics/** - ゲームの基本ルール
3. **character/** - キャラクター作成関連
4. **scenarios/** - セッション運用ガイド
5. **advanced/** - 経験者向け応用ルール
6. **reference/** - 逆引き・クイックリファレンス
7. **legal/** - プライバシーポリシー、利用規約

### ファイル命名規則
- PascalCase（例: `WhatIsTRPG.tsx`）
- 1ページ1ファイル
- 内容が明確にわかる名前

## 開発コマンド

### `bun dev`
開発モードで起動<br>
[http://localhost:5173](http://localhost:5173) でアクセス

### `bun run build`
本番用ビルド（`dist/` フォルダに出力）

### `bun run lint`
ESLintによるコードチェック

## 技術スタック
- **フレームワーク**: SolidJS
- **ビルドツール**: Vite
- **言語**: TypeScript
- **スタイリング**: CSS（詳細は今後決定）

## コンテンツ追加手順

1. 適切なカテゴリフォルダ配下に `.tsx` ファイルを作成
2. `app/Router.tsx` にルート追加
3. `app/Navigation.tsx` にナビゲーションリンク追加
4. 必要に応じて画像を `public/` に配置

## 今後の拡張予定
- [ ] 検索機能
- [ ] ブックマーク機能
- [ ] PDF出力機能
- [ ] 多言語対応（日/英）
