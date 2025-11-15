import { BattleCommandCardList } from '@/entities/battle-command';

function BattleCommands() {
  return (
    <div class="battle-commands-page">
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
