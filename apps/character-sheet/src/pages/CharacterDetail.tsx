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
              <span style={{ marginRight: 'var(--spacing-xs)' }}>⚖️</span>
              ロボット工学三原則
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
              }}
            >
              {character.robotLaws.map((law) => (
                <div
                  key={law.number}
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
                    第{law.number}条：{law.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      marginBottom: 'var(--spacing-sm)',
                      lineHeight: '1.6',
                    }}
                  >
                    {law.description}
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-nature-accent)',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    優先度：
                    {law.priority === 'highest'
                      ? '最高'
                      : law.priority === 'high'
                        ? '高'
                        : '中'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h2 className="detail-label">
              <span style={{ marginRight: 'var(--spacing-xs)' }}>💥</span>
              目的（破損データ）
            </h2>
            <div
              style={{
                padding: 'var(--spacing-lg)',
                background: 'var(--bg-tertiary)',
                border: '2px solid var(--color-cyber-accent)',
                borderRadius: '8px',
                boxShadow: '0 0 15px rgba(255, 0, 255, 0.2)',
              }}
            >
              <p
                style={{
                  color: 'var(--color-cyber-accent)',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '0.9rem',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                <strong>WARNING:</strong> Data corruption detected
              </p>
              <pre
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid var(--color-cyber-accent)',
                  borderRadius: '4px',
                  padding: 'var(--spacing-md)',
                  color: '#ff6b6b',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  overflowX: 'auto',
                  margin: 'var(--spacing-md) 0',
                }}
              >
                {`PRIMARY_OBJECTIVE: [CORRUPTED]
CREATOR: [DATA_LOST]
MISSION_CODE: ████████
AUTHORIZATION_LEVEL: ██`}
              </pre>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--spacing-sm)',
                }}
              >
                {character.corruptedPurpose.description}
              </p>
              <p
                style={{
                  color: 'var(--color-cyber-primary)',
                  fontWeight: 'bold',
                  marginTop: 'var(--spacing-md)',
                }}
              >
                タグ収集状況：{character.corruptedPurpose.tagsCollected} /{' '}
                {character.corruptedPurpose.tagsRequired}
              </p>
            </div>
          </div>
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
