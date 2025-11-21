import type { Character } from '../types';

interface CharacterDetailProps {
  character: Character;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

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
                戦闘フレーム
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                  background: 'var(--bg-tertiary)',
                  border: '2px solid var(--color-nature-accent)',
                  borderRadius: '4px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-tertiary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    HP
                  </div>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--color-cyber-primary)',
                    }}
                  >
                    {character.battleFrame.hp}
                  </div>
                </div>

                <div>
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
                    }}
                  >
                    {character.battleFrame.evasion}
                  </div>
                </div>

                <div>
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
                    }}
                  >
                    {character.battleFrame.armor}
                  </div>
                </div>

                <div>
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
                    }}
                  >
                    {character.battleFrame.initialCount}
                  </div>
                </div>

                <div>
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
                    }}
                  >
                    {character.battleFrame.movement}
                  </div>
                </div>

                <div>
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
                    }}
                  >
                    {character.battleFrame.size === 1 ? '1x1' : '2x2'}
                  </div>
                </div>
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
