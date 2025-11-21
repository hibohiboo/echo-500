import { useState } from 'react';
import type { Character, RobotLaw, CorruptedPurpose } from '../types';

interface CharacterFormProps {
  character?: Character;
  onSave: (character: Omit<Character, 'id'>) => void;
  onCancel: () => void;
}

// eslint-disable-next-line complexity
export default function CharacterForm({
  character,
  onSave,
  onCancel,
}: CharacterFormProps) {
  const [name, setName] = useState(character?.name || '');
  const [robotLaws, setRobotLaws] = useState<RobotLaw[]>(
    character?.robotLaws || [],
  );
  const [corruptedPurpose, setCorruptedPurpose] =
    useState<CorruptedPurpose | null>(character?.corruptedPurpose || null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Character name is required');
      return;
    }

    if (robotLaws.length !== 3) {
      setError('Robot laws must have exactly 3 entries');
      return;
    }

    if (!corruptedPurpose) {
      setError('Corrupted purpose is required');
      return;
    }

    onSave({
      name: name.trim(),
      robotLaws: robotLaws as [RobotLaw, RobotLaw, RobotLaw],
      corruptedPurpose,
    });
  };

  const updateRobotLaw = (
    index: number,
    field: keyof RobotLaw,
    value: string,
  ) => {
    const updated = [...robotLaws];
    if (field === 'number') {
      updated[index] = {
        ...updated[index],
        number: Number(value) as 1 | 2 | 3,
      };
    } else if (field === 'priority') {
      updated[index] = {
        ...updated[index],
        priority: value as 'highest' | 'high' | 'medium',
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setRobotLaws(updated);
  };

  const deleteRobotLaw = (index: number) => {
    setRobotLaws(robotLaws.filter((_, i) => i !== index));
  };

  const addRobotLaw = () => {
    if (robotLaws.length >= 3) return;
    setRobotLaws([
      ...robotLaws,
      {
        number: (robotLaws.length + 1) as 1 | 2 | 3,
        title: '',
        description: '',
        priority: 'medium',
      },
    ]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{character ? 'Edit Character' : 'Create New Character'}</h1>
        <p>Echo:500 - Character Database Entry</p>
      </header>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Character Name
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter character name..."
              autoFocus
            />
          </div>

          {/* Robot Laws */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ marginRight: 'var(--spacing-xs)' }}>⚖️</span>
              ロボット工学三原則
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
              }}
            >
              {robotLaws.map((law, index) => (
                <div
                  key={index}
                  style={{
                    padding: 'var(--spacing-md)',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--color-cyber-secondary)',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      条番号
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={law.number}
                      onChange={(e) =>
                        updateRobotLaw(index, 'number', e.target.value)
                      }
                      min="1"
                      max="3"
                      style={{ width: '80px' }}
                    />
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      タイトル
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={law.title}
                      onChange={(e) =>
                        updateRobotLaw(index, 'title', e.target.value)
                      }
                    />
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      説明
                    </label>
                    <textarea
                      className="form-input"
                      value={law.description}
                      onChange={(e) =>
                        updateRobotLaw(index, 'description', e.target.value)
                      }
                      rows={3}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      優先度
                    </label>
                    <select
                      className="form-input"
                      value={law.priority}
                      onChange={(e) =>
                        updateRobotLaw(index, 'priority', e.target.value)
                      }
                    >
                      <option value="highest">最高</option>
                      <option value="high">高</option>
                      <option value="medium">中</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteRobotLaw(index)}
                    style={{ width: '100%' }}
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>

            {robotLaws.length < 3 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addRobotLaw}
                style={{ marginTop: 'var(--spacing-md)', width: '100%' }}
              >
                + ロボット原則を追加
              </button>
            )}
          </div>

          {/* Corrupted Purpose */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ marginRight: 'var(--spacing-xs)' }}>💥</span>
              目的（破損データ）
            </label>

            {corruptedPurpose ? (
              <div
                style={{
                  padding: 'var(--spacing-md)',
                  background: 'var(--bg-tertiary)',
                  border: '2px solid var(--color-cyber-accent)',
                  borderRadius: '8px',
                }}
              >
                <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      color: 'var(--text-tertiary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    タグ収集状況
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--spacing-sm)',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type="number"
                      className="form-input"
                      value={corruptedPurpose.tagsCollected}
                      onChange={(e) =>
                        setCorruptedPurpose({
                          ...corruptedPurpose,
                          tagsCollected: Number(e.target.value),
                        })
                      }
                      min="0"
                      max="5"
                      style={{ width: '80px' }}
                    />
                    <span style={{ color: 'var(--text-secondary)' }}>/ 5</span>
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      color: 'var(--text-tertiary)',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    説明
                  </label>
                  <textarea
                    className="form-input"
                    value={corruptedPurpose.description}
                    onChange={(e) =>
                      setCorruptedPurpose({
                        ...corruptedPurpose,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setCorruptedPurpose(null)}
                  style={{ width: '100%' }}
                >
                  目的を削除
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  setCorruptedPurpose({
                    isCorrupted: true,
                    tagsCollected: 0,
                    tagsRequired: 5,
                    description:
                      '破損したメモリ。あなたの目的に関するデータが含まれていたようだ。５つのタグを獲得し、再設定せよ。',
                  })
                }
                style={{ width: '100%' }}
              >
                + 目的を追加
              </button>
            )}
          </div>

          {error && (
            <p
              style={{
                color: 'var(--color-cyber-accent)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button type="submit" className="btn btn-primary">
              {character ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
