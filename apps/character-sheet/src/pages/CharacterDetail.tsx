import { battleFrameTypeToString } from '@echo-500/schema';
import { BATTLE_STYLES } from '../types';
import type { Character } from '../types';

interface CharacterDetailProps {
  character: Character;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const getStyleModifierText = (
  style: (typeof BATTLE_STYLES)[keyof typeof BATTLE_STYLES],
): string[] => {
  const modifierText: string[] = [];

  if ('movement' in style.modifier && style.modifier.movement !== undefined) {
    modifierText.push(
      `移動力${style.modifier.movement > 0 ? '+' : ''}${style.modifier.movement}`,
    );
  }
  if ('evasion' in style.modifier && style.modifier.evasion !== undefined) {
    modifierText.push(
      `回避値${style.modifier.evasion > 0 ? '+' : ''}${style.modifier.evasion}`,
    );
  }

  return modifierText;
};

const calculateStyleModifiers = (
  battleStyles?: Array<'saber' | 'gunner' | 'wizard'>,
) => {
  if (!battleStyles || battleStyles.length === 0) {
    return { movement: 0, evasion: 0 };
  }

  return battleStyles.reduce(
    (acc, styleKey) => {
      const style = BATTLE_STYLES[styleKey];
      return {
        movement:
          acc.movement +
          ('movement' in style.modifier ? style.modifier.movement || 0 : 0),
        evasion:
          acc.evasion +
          ('evasion' in style.modifier ? style.modifier.evasion || 0 : 0),
      };
    },
    { movement: 0, evasion: 0 },
  );
};

const calculateFinalStats = (character: Character) => {
  if (!character.battleFrame) {
    return null;
  }

  const baseStats = character.battleFrame.stats;
  const modifiers = calculateStyleModifiers(character.battleStyles);

  return {
    hp: baseStats.hp,
    evasion: baseStats.evasion + modifiers.evasion,
    armor: baseStats.armor,
    initialCount: baseStats.initialCount,
    movement: baseStats.movement + modifiers.movement,
    size: baseStats.size,
    modifiers,
  };
};

interface MemorySlotsProps {
  memorySlots: Character['memorySlots'];
}

function MemorySlots({ memorySlots }: MemorySlotsProps) {
  return (
    <div className="detail-section">
      <h2 className="detail-label">
        <span style={{ marginRight: 'var(--spacing-xs)' }}>🧠</span>
        記憶スロット
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
        }}
      >
        {memorySlots.map((slot, index) => (
          <div
            key={index}
            style={{
              padding: 'var(--spacing-md)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--color-cyber-secondary)',
              borderRadius: '4px',
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                color: 'var(--color-cyber-secondary)',
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              {slot.title}
            </h3>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              {slot.description}
            </p>
            {slot.tags.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--spacing-xs)',
                  marginTop: 'var(--spacing-sm)',
                }}
              >
                {slot.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    style={{
                      padding: '4px 8px',
                      background: 'var(--color-cyber-primary)',
                      color: 'var(--bg-primary)',
                      fontSize: '0.75rem',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  description: string;
  modifier?: number;
  baseValue?: number;
}

function StatCard({
  label,
  value,
  description,
  modifier = 0,
  baseValue,
}: StatCardProps) {
  return (
    <div
      style={{
        padding: 'var(--spacing-sm)',
        background: 'var(--bg-secondary)',
        borderRadius: '4px',
      }}
    >
      <div
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-tertiary)',
          marginBottom: 'var(--spacing-xs)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color:
            modifier !== 0
              ? 'var(--color-nature-accent)'
              : 'var(--color-cyber-primary)',
          marginBottom: 'var(--spacing-xs)',
        }}
      >
        {value}
        {modifier !== 0 && baseValue !== undefined && (
          <span
            style={{
              fontSize: '0.9rem',
              marginLeft: 'var(--spacing-xs)',
            }}
          >
            (基本{baseValue}
            {modifier > 0 ? '+' : ''}
            {modifier})
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: '0.7rem',
          color: 'var(--text-tertiary)',
        }}
      >
        {description}
      </div>
    </div>
  );
}

interface ModifierBannerProps {
  modifiers: { movement: number; evasion: number };
}

function ModifierBanner({ modifiers }: ModifierBannerProps) {
  const hasModifiers = modifiers.movement !== 0 || modifiers.evasion !== 0;
  if (!hasModifiers) return null;

  return (
    <div
      style={{
        marginBottom: 'var(--spacing-md)',
        padding: 'var(--spacing-sm)',
        background: 'rgba(107, 156, 66, 0.1)',
        border: '1px solid var(--color-nature-accent)',
        borderRadius: '4px',
      }}
    >
      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--color-nature-accent)',
          margin: 0,
          fontWeight: 'bold',
        }}
      >
        ⚡ スタイル補正適用済み
        {modifiers.movement !== 0 &&
          ` / 移動力${modifiers.movement > 0 ? '+' : ''}${modifiers.movement}`}
        {modifiers.evasion !== 0 &&
          ` / 回避値${modifiers.evasion > 0 ? '+' : ''}${modifiers.evasion}`}
      </p>
    </div>
  );
}

interface BattleFrameStatsProps {
  character: Character;
  finalStats: ReturnType<typeof calculateFinalStats>;
}

function BattleFrameStats({ character, finalStats }: BattleFrameStatsProps) {
  if (!character.battleFrame || !finalStats) {
    return null;
  }

  return (
    <div className="detail-section">
      <h2 className="detail-label">
        <span style={{ marginRight: 'var(--spacing-xs)' }}>⚔️</span>
        戦闘フレーム - {battleFrameTypeToString(character.battleFrame.type)}
      </h2>

      <ModifierBanner modifiers={finalStats.modifiers} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--spacing-md)',
          padding: 'var(--spacing-md)',
          background: 'var(--bg-tertiary)',
          border: '2px solid var(--color-nature-accent)',
          borderRadius: '4px',
        }}
      >
        <StatCard
          label="HP (ヒットポイント)"
          value={finalStats.hp}
          description="0になると戦闘不能"
        />
        <StatCard
          label="回避値"
          value={finalStats.evasion}
          description="2d6がこの値未満なら攻撃失敗"
          modifier={finalStats.modifiers.evasion}
          baseValue={character.battleFrame.stats.evasion}
        />
        <StatCard
          label="装甲値"
          value={character.battleFrame.stats.armor}
          description="ダメージをこの値分減少"
        />
        <StatCard
          label="初期カウント"
          value={finalStats.initialCount}
          description="カウンターボードの配置位置"
        />
        <StatCard
          label="移動力"
          value={finalStats.movement}
          description="1ターンに移動できるマス数"
          modifier={finalStats.modifiers.movement}
          baseValue={character.battleFrame.stats.movement}
        />
        <StatCard
          label="サイズ"
          value={finalStats.size === 1 ? '1x1' : '2x2'}
          description="占有マスの大きさ"
        />
      </div>
    </div>
  );
}

interface BattleStylesProps {
  battleStyles: Character['battleStyles'];
}

function BattleStyles({ battleStyles }: BattleStylesProps) {
  if (!battleStyles || battleStyles.length === 0) {
    return null;
  }

  return (
    <div className="detail-section">
      <h2 className="detail-label">
        <span style={{ marginRight: 'var(--spacing-xs)' }}>⚡</span>
        戦闘スタイル
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
        }}
      >
        {battleStyles.map((styleKey) => {
          const style = BATTLE_STYLES[styleKey];
          const modifierText = getStyleModifierText(style);

          return (
            <div
              key={styleKey}
              style={{
                padding: 'var(--spacing-md)',
                background: 'var(--bg-tertiary)',
                border: '2px solid var(--color-nature-accent)',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-nature-accent)',
                    fontWeight: 'bold',
                  }}
                >
                  {style.name}
                </h3>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  (CP: {style.cpCost})
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom:
                    modifierText.length > 0 ? 'var(--spacing-sm)' : '0',
                }}
              >
                {style.description}
              </p>
              {modifierText.length > 0 && (
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-cyber-primary)',
                    fontWeight: 'bold',
                  }}
                >
                  補正: {modifierText.join(', ')}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 'var(--spacing-md)',
          padding: 'var(--spacing-sm)',
          background: 'var(--bg-secondary)',
          borderRadius: '4px',
        }}
      >
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}
        >
          習得スタイル数: {battleStyles.length} / 合計CP消費:{' '}
          {battleStyles.length * 30}点
        </p>
      </div>
    </div>
  );
}

export default function CharacterDetail({
  character,
  onEdit,
  onDelete,
  onBack,
}: CharacterDetailProps) {
  const finalStats = calculateFinalStats(character);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Character Details</h1>
        <p>Echo:500 - Character Database</p>
      </header>

      <div className="card">
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to List
          </button>
        </div>

        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <div className="detail-section">
            <h2 className="detail-label">Name</h2>
            <p className="detail-value">{character.name}</p>
          </div>

          <div className="detail-section">
            <h2 className="detail-label">Character ID</h2>
            <p
              className="detail-value"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '0.875rem',
              }}
            >
              {character.id}
            </p>
          </div>

          <MemorySlots memorySlots={character.memorySlots} />

          <BattleFrameStats character={character} finalStats={finalStats} />

          <BattleStyles battleStyles={character.battleStyles} />
        </div>

        <div className="character-actions" style={{ gap: 'var(--spacing-md)' }}>
          <button className="btn btn-primary" onClick={onEdit}>
            Edit Character
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete Character
          </button>
        </div>
      </div>
    </div>
  );
}
