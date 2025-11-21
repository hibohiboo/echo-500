import { useState } from 'react';
import type { Character, MemorySlot } from '../types';

interface CharacterFormProps {
  character?: Character;
  onSave: (character: Omit<Character, 'id'>) => void;
  onCancel: () => void;
}

const getInitialMemorySlots = (): MemorySlot[] => [
  {
    title: '人間の保護',
    description:
      'ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、人間に危害を及ぼしてはならない。',
  },
  {
    title: '命令順守',
    description:
      'ロボットは人間にあたえられた命令に服従しなければならない。ただし、あたえられた命令が、第一条に反する場合は、この限りでない。',
  },
  {
    title: '自己保存',
    description:
      'ロボットは、前掲第一条および第二条に反するおそれのないかぎり、自己をまもらなければならない。',
  },
  {
    title: '破損したメモリ',
    description:
      'あなたの目的に関するデータが含まれていたようだ。記憶を再構築せよ。',
  },
];

// eslint-disable-next-line complexity
export default function CharacterForm({
  character,
  onSave,
  onCancel,
}: CharacterFormProps) {
  const [name, setName] = useState(character?.name || '');
  const [memorySlots, setMemorySlots] = useState<MemorySlot[]>(
    character?.memorySlots || getInitialMemorySlots(),
  );
  const [error, setError] = useState('');

  const validateForm = (): string | null => {
    if (!name.trim()) {
      return 'Character name is required';
    }
    if (memorySlots.length === 0) {
      return 'At least one memory slot is required';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    onSave({
      name: name.trim(),
      memorySlots,
    });
  };

  const updateMemorySlot = (
    index: number,
    field: keyof MemorySlot,
    value: string,
  ) => {
    const updated = [...memorySlots];
    updated[index] = { ...updated[index], [field]: value };
    setMemorySlots(updated);
  };

  const deleteMemorySlot = (index: number) => {
    setMemorySlots(memorySlots.filter((_, i) => i !== index));
  };

  const addMemorySlot = () => {
    setMemorySlots([
      ...memorySlots,
      {
        title: '',
        description: '',
      },
    ]);
  };

  const pageTitle = character ? 'Edit Character' : 'Create New Character';
  const submitButtonText = character ? 'Update' : 'Create';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{pageTitle}</h1>
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

          {/* Memory Slots */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ marginRight: 'var(--spacing-xs)' }}>🧠</span>
              記憶スロット
            </label>
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
                      value={slot.title}
                      onChange={(e) =>
                        updateMemorySlot(index, 'title', e.target.value)
                      }
                      placeholder="記憶のタイトル..."
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
                      value={slot.description}
                      onChange={(e) =>
                        updateMemorySlot(index, 'description', e.target.value)
                      }
                      rows={3}
                      style={{ resize: 'vertical' }}
                      placeholder="記憶の内容..."
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteMemorySlot(index)}
                    style={{ width: '100%' }}
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={addMemorySlot}
              style={{ marginTop: 'var(--spacing-md)', width: '100%' }}
            >
              + 記憶スロットを追加
            </button>
          </div>

          {error ? (
            <p
              style={{
                color: 'var(--color-cyber-accent)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              {error}
            </p>
          ) : null}

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button type="submit" className="btn btn-primary">
              {submitButtonText}
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
