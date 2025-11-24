import { useState } from 'react';
import type { Character, MemorySlot, BattleFrame } from '../types';

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
    tags: ['ロボット工学三原則', 'システムコア', '優先度：最高'],
  },
  {
    title: '命令順守',
    description:
      'ロボットは人間にあたえられた命令に服従しなければならない。ただし、あたえられた命令が、第一条に反する場合は、この限りでない。',
    tags: ['ロボット工学三原則', 'システムコア', '優先度：高'],
  },
  {
    title: '自己保存',
    description:
      'ロボットは、前掲第一条および第二条に反するおそれのないかぎり、自己をまもらなければならない。',
    tags: ['ロボット工学三原則', 'システムコア', '優先度：中'],
  },
  {
    title: '破損したメモリ',
    description:
      'あなたの目的に関するデータが含まれていたようだ。記憶を再構築せよ。',
    tags: ['破損データ', '要復旧', 'クリティカル'],
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
  const [battleFrame, setBattleFrame] = useState<BattleFrame>(
    character?.battleFrame || null,
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
      battleFrame: battleFrame || undefined,
    });
  };

  const updateMemorySlot = (
    index: number,
    field: keyof MemorySlot,
    value: string | string[],
  ) => {
    const updated = [...memorySlots];
    updated[index] = { ...updated[index], [field]: value };
    setMemorySlots(updated);
  };

  const addTag = (slotIndex: number, tag: string) => {
    const updated = [...memorySlots];
    const trimmedTag = tag.trim();
    if (trimmedTag && !updated[slotIndex].tags.includes(trimmedTag)) {
      updated[slotIndex] = {
        ...updated[slotIndex],
        tags: [...updated[slotIndex].tags, trimmedTag],
      };
      setMemorySlots(updated);
    }
  };

  const removeTag = (slotIndex: number, tagIndex: number) => {
    const updated = [...memorySlots];
    updated[slotIndex] = {
      ...updated[slotIndex],
      tags: updated[slotIndex].tags.filter((_, i) => i !== tagIndex),
    };
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
        tags: [],
      },
    ]);
  };

  const battleFramePresets = {
    basic: {
      hp: 20,
      evasion: 5,
      armor: 2,
      initialCount: 5,
      movement: 3,
      size: 1 as const,
    },
    light: {
      hp: 15,
      evasion: 7,
      armor: 0,
      initialCount: 3,
      movement: 5,
      size: 1 as const,
    },
    heavy: {
      hp: 30,
      evasion: 3,
      armor: 5,
      initialCount: 8,
      movement: 2,
      size: 1 as const,
    },
  };

  const createBattleFrame = (preset: 'basic' | 'light' | 'heavy' = 'basic') => {
    setBattleFrame({
      stats: { ...battleFramePresets[preset] },
      type: preset,
    });
  };

  const updateBattleFrame = (
    field: keyof typeof battleFramePresets.basic,
    value: number,
  ) => {
    if (!battleFrame) return;
    setBattleFrame({
      ...battleFrame,
      stats: { ...battleFrame.stats, [field]: value },
    });
  };

  const removeBattleFrame = () => {
    setBattleFrame(null);
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

                  <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      タグ
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-xs)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      {slot.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            background: 'var(--color-cyber-primary)',
                            color: 'var(--bg-primary)',
                            fontSize: '0.75rem',
                            borderRadius: '12px',
                            fontFamily: 'var(--font-primary)',
                          }}
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index, tagIndex)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'inherit',
                              cursor: 'pointer',
                              padding: '0',
                              fontSize: '1rem',
                              lineHeight: '1',
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="タグを入力..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            addTag(index, input.value);
                            input.value = '';
                          }
                        }}
                        style={{ flex: 1 }}
                      />
                    </div>
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

          {/* Battle Frame */}
          <div className="form-group">
            <label className="form-label">
              <span style={{ marginRight: 'var(--spacing-xs)' }}>⚔️</span>
              戦闘フレーム (バスターシナリオ用)
            </label>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-tertiary)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              バスターシナリオに参加する場合は戦闘フレームを設定してください
            </p>

            {/* Frame Type Selection */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                background: 'var(--bg-tertiary)',
                borderRadius: '4px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  cursor: 'pointer',
                  padding: 'var(--spacing-sm)',
                  background:
                    battleFrame === null
                      ? 'var(--bg-secondary)'
                      : 'transparent',
                  borderRadius: '4px',
                  border:
                    battleFrame === null
                      ? '2px solid var(--color-cyber-secondary)'
                      : '2px solid transparent',
                }}
              >
                <input
                  type="radio"
                  name="battleFrameType"
                  checked={battleFrame === null}
                  onChange={() => removeBattleFrame()}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 'bold' }}>なし</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  (戦闘フレームを使用しない)
                </span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  cursor: 'pointer',
                  padding: 'var(--spacing-sm)',
                  background:
                    battleFrame?.type === 'basic'
                      ? 'var(--bg-secondary)'
                      : 'transparent',
                  borderRadius: '4px',
                  border:
                    battleFrame?.type === 'basic'
                      ? '2px solid var(--color-nature-accent)'
                      : '2px solid transparent',
                }}
              >
                <input
                  type="radio"
                  name="battleFrameType"
                  checked={battleFrame?.type === 'basic'}
                  onChange={() => createBattleFrame('basic')}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 'bold' }}>ベーシック</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  (バランス型)
                </span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  cursor: 'pointer',
                  padding: 'var(--spacing-sm)',
                  background:
                    battleFrame?.type === 'light'
                      ? 'var(--bg-secondary)'
                      : 'transparent',
                  borderRadius: '4px',
                  border:
                    battleFrame?.type === 'light'
                      ? '2px solid var(--color-nature-accent)'
                      : '2px solid transparent',
                }}
              >
                <input
                  type="radio"
                  name="battleFrameType"
                  checked={battleFrame?.type === 'light'}
                  onChange={() => createBattleFrame('light')}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 'bold' }}>ライト</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  (高機動型)
                </span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  cursor: 'pointer',
                  padding: 'var(--spacing-sm)',
                  background:
                    battleFrame?.type === 'heavy'
                      ? 'var(--bg-secondary)'
                      : 'transparent',
                  borderRadius: '4px',
                  border:
                    battleFrame?.type === 'heavy'
                      ? '2px solid var(--color-nature-accent)'
                      : '2px solid transparent',
                }}
              >
                <input
                  type="radio"
                  name="battleFrameType"
                  checked={battleFrame?.type === 'heavy'}
                  onChange={() => createBattleFrame('heavy')}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontWeight: 'bold' }}>ヘビー</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                  }}
                >
                  (重装甲型)
                </span>
              </label>
            </div>

            {battleFrame ? (
              <div
                style={{
                  padding: 'var(--spacing-md)',
                  background: 'var(--bg-tertiary)',
                  border: '2px solid var(--color-nature-accent)',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-md)',
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      HP (ヒットポイント)
                    </label>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      0になると戦闘不能
                    </p>
                    <input
                      type="number"
                      className="form-input"
                      value={battleFrame.stats.hp}
                      onChange={(e) =>
                        updateBattleFrame('hp', Number(e.target.value))
                      }
                      min="1"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      回避値
                    </label>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      2d6がこの値未満なら攻撃失敗
                    </p>
                    <input
                      type="number"
                      className="form-input"
                      value={battleFrame.stats.evasion}
                      onChange={(e) =>
                        updateBattleFrame('evasion', Number(e.target.value))
                      }
                      min="2"
                      max="12"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      装甲値
                    </label>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      ダメージをこの値分減少
                    </p>
                    <input
                      type="number"
                      className="form-input"
                      value={battleFrame.stats.armor}
                      onChange={(e) =>
                        updateBattleFrame('armor', Number(e.target.value))
                      }
                      min="0"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      初期カウント
                    </label>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      カウンターボードの配置位置
                    </p>
                    <input
                      type="number"
                      className="form-input"
                      value={battleFrame.stats.initialCount}
                      onChange={(e) =>
                        updateBattleFrame(
                          'initialCount',
                          Number(e.target.value),
                        )
                      }
                      min="0"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      移動力
                    </label>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      1ターンに移動できるマス数
                    </p>
                    <input
                      type="number"
                      className="form-input"
                      value={battleFrame.stats.movement}
                      onChange={(e) =>
                        updateBattleFrame('movement', Number(e.target.value))
                      }
                      min="0"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      サイズ
                    </label>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-tertiary)',
                        marginBottom: 'var(--spacing-xs)',
                      }}
                    >
                      占有マスの大きさ (1=1x1, 2=2x2)
                    </p>
                    <select
                      className="form-input"
                      value={battleFrame.stats.size}
                      onChange={(e) =>
                        updateBattleFrame(
                          'size',
                          Number(e.target.value) as 1 | 2,
                        )
                      }
                    >
                      <option value={1}>1 (1x1マス)</option>
                      <option value={2}>2 (2x2マス)</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : null}
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
