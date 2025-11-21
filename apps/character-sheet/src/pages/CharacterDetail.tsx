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
                    }}
                  >
                    {slot.description}
                  </p>
                </div>
              ))}
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
