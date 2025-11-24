import { BattleCommandCardList } from '@/entities/battle-command';

function BattleCommands() {
  return (
    <div class="battle-commands-page">
      <p>戦闘シナリオの前には戦闘モジュールをCPを使って取得する。</p>
      <p>使用できるCPはシナリオに記載されている。</p>
      <p>最初に遊ぶ場合は100点を推奨。</p>
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
