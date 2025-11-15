import { For, Show } from 'solid-js';
import { useSpreadSheetBattleSkillData } from '@/shared/spreadsheet/api';
import { BattleCommandCard } from './BattleCommandCard';

export function BattleCommandCardList() {
  const cards = useSpreadSheetBattleSkillData();

  return (
    <div class="battle-command-card-list">
      <div class="battle-command-card-list__header">
        <h2 class="battle-command-card-list__title">戦闘用コマンド一覧</h2>
        <Show when={cards.length > 0}>
          <span class="battle-command-card-list__count">
            {cards.length} cards
          </span>
        </Show>
      </div>

      <Show
        when={cards.length > 0}
        fallback={
          <div class="battle-command-card-list__loading">
            <div class="battle-command-card-list__spinner" />
            <p>Loading battle commands...</p>
          </div>
        }
      >
        <div class="battle-command-card-list__grid">
          <For each={cards}>
            {(card) => (
              <BattleCommandCard
                name={card.name}
                cp={card.cp}
                timing={card.timing}
                target={card.target}
                range={card.range}
                cost={card.cost}
                effect={card.effect}
                flavor={card.flavor}
                tags={card.tags}
                details={card.details}
              />
            )}
          </For>
        </div>
      </Show>

      <style>{`
        .battle-command-card-list {
          width: 100%;
          padding: var(--spacing-lg);
        }

        @scope {
          .battle-command-card-list__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: var(--spacing-xl);
            padding-bottom: var(--spacing-md);
            border-bottom: 2px solid var(--color-cyber-primary);
          }

          .battle-command-card-list__title {
            font-family: var(--font-heading);
            font-size: 2rem;
            color: var(--color-cyber-primary);
            margin: 0;
            text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
          }

          .battle-command-card-list__count {
            font-family: var(--font-primary);
            font-size: 0.85rem;
            color: var(--text-tertiary);
            background: rgba(0, 255, 204, 0.1);
            padding: 6px 12px;
            border-radius: 4px;
            border: 1px solid var(--color-cyber-primary);
            letter-spacing: 0.05em;
          }

          .battle-command-card-list__grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: var(--spacing-lg);
          }

          @media (max-width: 768px) {
            .battle-command-card-list__grid {
              grid-template-columns: 1fr;
            }
          }

          .battle-command-card-list__loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-xl);
            gap: var(--spacing-lg);
            color: var(--text-tertiary);
          }

          .battle-command-card-list__loading p {
            font-family: var(--font-primary);
            font-size: 0.9rem;
            letter-spacing: 0.05em;
            margin: 0;
          }

          .battle-command-card-list__spinner {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(0, 255, 204, 0.1);
            border-top-color: var(--color-cyber-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        }
      `}</style>
    </div>
  );
}
