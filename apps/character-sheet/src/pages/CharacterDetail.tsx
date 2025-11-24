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

export default function CharacterDetail({
  character,
  onEdit,
  onDelete,
  onBack,
}: CharacterDetailProps) {
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
              {character.memorySlots.map((slot, index) => (
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

          {character.battleFrame && (
            <div className="detail-section">
              <h2 className="detail-label">
                <span style={{ marginRight: 'var(--spacing-xs)' }}>⚔️</span>
                戦闘フレーム -{' '}
                {battleFrameTypeToString(character.battleFrame.type)}
              </h2>
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
                    HP (ヒットポイント)
                  </div>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--color-cyber-primary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    {character.battleFrame.stats.hp}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    0になると戦闘不能
                  </div>
                </div>

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
                    回避値
                  </div>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--color-cyber-primary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    {character.battleFrame.stats.evasion}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    2d6がこの値未満なら攻撃失敗
                  </div>
                </div>

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
                    装甲値
                  </div>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--color-cyber-primary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    {character.battleFrame.stats.armor}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    ダメージをこの値分減少
                  </div>
                </div>

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
                    初期カウント
                  </div>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--color-cyber-primary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    {character.battleFrame.stats.initialCount}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    カウンターボードの配置位置
                  </div>
                </div>

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
                    移動力
                  </div>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--color-cyber-primary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    {character.battleFrame.stats.movement}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    1ターンに移動できるマス数
                  </div>
                </div>

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
                    サイズ
                  </div>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--color-cyber-primary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    {character.battleFrame.stats.size === 1 ? '1x1' : '2x2'}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    占有マスの大きさ
                  </div>
                </div>
              </div>
            </div>
          )}

          {character.battleStyles && character.battleStyles.length > 0 && (
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
                {character.battleStyles.map((styleKey) => {
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
                  習得スタイル数: {character.battleStyles.length} / 合計CP消費:{' '}
                  {character.battleStyles.length * 30}点
                </p>
              </div>
            </div>
          )}
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
