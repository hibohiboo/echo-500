export type CharacterListItem = { id: string; name: string };
interface CharacterListViewProps {
  characters: CharacterListItem[];
  onCreateNew: () => void;
  onViewDetail: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CharacterListView({
  characters,
  onCreateNew,
  onViewDetail,
  onEdit,
  onDelete,
}: CharacterListViewProps) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Character Sheet Manager</h1>
        <p>Echo:500 - Post-Apocalyptic Character Database</p>
      </header>

      <div className="card">
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <button className="btn btn-primary" onClick={onCreateNew}>
            + New Character
          </button>
        </div>

        {characters.length === 0 ? (
          <div className="empty-state">
            <p>No characters found. Create your first character to begin.</p>
          </div>
        ) : (
          <div className="character-list">
            {characters.map((character) => (
              <div key={character.id} className="character-item">
                <button
                  className="character-name-button"
                  onClick={() => onViewDetail(character.id)}
                >
                  <span className="character-name">{character.name}</span>
                </button>
                <div className="character-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => onEdit(character.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(character.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
