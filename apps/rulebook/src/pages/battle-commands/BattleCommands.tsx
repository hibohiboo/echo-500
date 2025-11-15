import { BattleCommandCardList } from '@/entities/battle-command';

function BattleCommands() {
  return (
    <div class="battle-commands-page">
      <p>戦闘ミッションの前には戦闘のためのモジュールを用意する。</p>
      <p>
        戦闘スタイルごとを３つまで選び、選んだスタイルのモジュールをCPを使ってインストールする。
      </p>
      <BattleCommandCardList />

      <style>{`
        .battle-commands-page {
          width: 100%;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}

export default BattleCommands;
