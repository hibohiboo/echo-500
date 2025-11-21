キャラクターシートアプリの作成
apps/character-sheet にキャラクターシート管理用の新しいReactフロントエンドアプリケーションを作成します。apps/rulebook と同様のSF風のスタイルを適用します。

ユーザーレビューが必要な事項
IMPORTANT

apps ディレクトリ内に新しい React プロジェクトを初期化します。ビルドツールとして、他のアプリと同様に vite を使用します。パッケージマネージャーには bun を使用します。

提案される変更
プロジェクトの初期化
[NEW]
apps/character-sheet
apps/scenario-editor を参考に、手動でプロジェクト構造を作成します。
package.json を作成し、apps/scenario-editor をベースに必要な依存関係のみ定義します。
vite.config.ts, tsconfig.json 等の設定ファイルを作成します。
スタイリング
[NEW]
apps/character-sheet/src/theme.css
apps/rulebook/src/styles/theme.css からSFテーマの変数とグローバルスタイルをコピーします。
[NEW]
apps/character-sheet/src/index.css
theme.css をインポートします。
基本的なレイアウトスタイルを追加します。
アプリケーションロジック
[NEW]
apps/character-sheet/src/types.ts
Character インターフェースを定義します:
export interface Character {
id: string;
name: string;
}
[NEW]
apps/character-sheet/src/store/mockBackend.ts
localStorage を使用してバックエンド呼び出しをシミュレートする関数を実装します:
getCharacters()
getCharacter(id)
createCharacter(name)
updateCharacter(id, name)
deleteCharacter(id)
UI コンポーネント
[NEW]
apps/character-sheet/src/App.tsx
メインアプリケーションコンポーネント。
リスト、作成、編集ビューを切り替えるための単純なルーティング（または初期バージョンの条件付きレンダリング）を実装します。
[NEW]
apps/character-sheet/src/pages/CharacterList.tsx
キャラクターのリストを表示します。
「新規作成」ボタン。
各アイテムの「編集」および「削除」ボタン。
[NEW]
apps/character-sheet/src/pages/CharacterForm.tsx
キャラクターを作成/編集するためのフォーム（名前入力）。
検証計画
自動テスト
この初期プロトタイプにはありません。
手動検証
アプリの起動: apps/character-sheet で bun run dev を実行します。
作成: 「新規作成」をクリックし、名前を入力して保存します。リストに表示されることを確認します。
リスト: 作成されたキャラクターがリストに表示されることを確認します。
編集: キャラクターの「編集」をクリックし、名前を変更して保存します。リスト内の名前が更新されることを確認します。
削除: キャラクターの「削除」をクリックします。リストから削除されることを確認します。
永続性: ページを更新します。データが保持されていることを確認します（localStorage を使用しているため）。
スタイリング: アプリがSFテーマ（ダークモード、特定の色、フォント）のように見えることを確認します。
