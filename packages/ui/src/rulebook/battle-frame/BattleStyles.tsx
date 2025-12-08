export interface BattleStyle {
  name: string;
  description: string;
  cpCost: number;
  modifier: {
    movement?: number;
    evasion?: number;
  };
}

export interface BattleStylesProps {
  battleStyles: BattleStyle[];
}

function getStyleModifierText(style: BattleStyle): string[] {
  const modifierText: string[] = [];

  if (style.modifier.movement !== undefined) {
    modifierText.push(
      `移動力${style.modifier.movement > 0 ? '+' : ''}${style.modifier.movement}`,
    );
  }
  if (style.modifier.evasion !== undefined) {
    modifierText.push(
      `回避値${style.modifier.evasion > 0 ? '+' : ''}${style.modifier.evasion}`,
    );
  }

  return modifierText;
}

export function BattleStyles({ battleStyles }: BattleStylesProps) {
  if (!battleStyles || battleStyles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
        <span>⚡</span>
        戦闘スタイル
      </h2>
      <div className="flex flex-col gap-4">
        {battleStyles.map((style, index) => {
          const modifierText = getStyleModifierText(style);

          return (
            <div
              key={index}
              className="p-4 bg-bg-tertiary border-2 border-nature-accent rounded"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg text-nature-accent font-bold">
                  {style.name}
                </h3>
                <span className="text-xs text-text-tertiary">
                  (CP: {style.cpCost})
                </span>
              </div>
              <p
                className={`text-sm text-text-secondary ${modifierText.length > 0 ? 'mb-2' : ''}`}
              >
                {style.description}
              </p>
              {modifierText.length > 0 && (
                <p className="text-sm text-cyber-primary font-bold">
                  補正: {modifierText.join(', ')}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 px-3 py-2 bg-bg-secondary rounded">
        <p className="text-sm text-text-secondary">
          習得スタイル数: {battleStyles.length} / 合計CP消費:{' '}
          {battleStyles.length * 30}点
        </p>
      </div>
    </div>
  );
}
