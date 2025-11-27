import {
  useBattleCommandData,
  BattleCommandCard,
} from '@echo-500/frontend-common';
import {
  BATTLE_STYLES,
  type BattleStyleType,
  type MemorySlot,
  type Character,
} from '@/entities/character';

interface CharacterFormViewProps {
  character?: Character;
  name: string;
  setName: (name: string) => void;
  memorySlots: MemorySlot[];
  battleFrame: Character['battleFrame'];
  battleStyles: BattleStyleType[];
  battleCommands: string[];
  error: string;
  setError: (error: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  updateMemorySlot: (
    index: number,
    field: keyof MemorySlot,
    value: string | string[],
  ) => void;
  addTag: (slotIndex: number, tag: string) => void;
  removeTag: (slotIndex: number, tagIndex: number) => void;
  deleteMemorySlot: (index: number) => void;
  addMemorySlot: () => void;
  createBattleFrame: (preset: 'basic' | 'light' | 'heavy') => void;
  updateBattleFrame: (
    field: 'hp' | 'evasion' | 'armor' | 'initialCount' | 'movement' | 'size',
    value: number,
  ) => void;
  removeBattleFrame: () => void;
  toggleBattleStyle: (style: BattleStyleType) => void;
  toggleBattleCommand: (commandName: string) => void;
}

export default function CharacterFormView({
  character,
  name,
  setName,
  memorySlots,
  battleFrame,
  battleStyles,
  battleCommands,
  error,
  setError,
  onSubmit,
  onCancel,
  updateMemorySlot,
  addTag,
  removeTag,
  deleteMemorySlot,
  addMemorySlot,
  createBattleFrame,
  updateBattleFrame,
  removeBattleFrame,
  toggleBattleStyle,
  toggleBattleCommand,
}: CharacterFormViewProps) {
  const apiKey = import.meta.env.VITE_SPREAD_SHEET_API_KEY || '';
  const spreadSheetId = import.meta.env.VITE_SPREAD_SHEET_ID || '';
  const { data: availableCommands } = useBattleCommandData(
    apiKey,
    spreadSheetId,
  );

  const getAvailableCommandsByStyle = () => {
    if (battleStyles.length === 0) return [];

    return availableCommands.filter((cmd) =>
      battleStyles.some((style) =>
        cmd.tags.includes(BATTLE_STYLES[style].name),
      ),
    );
  };

  const calculateTotalCP = () => {
    const styleCost = battleStyles.length * 30;
    const commandCost = battleCommands.reduce((sum, cmdName) => {
      const cmd = availableCommands.find((c) => c.name === cmdName);
      return sum + (cmd?.cp || 0);
    }, 0);
    return { styleCost, commandCost, total: styleCost + commandCost };
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
        <form onSubmit={onSubmit}>
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
              <span className="mr-1">🧠</span>
              記憶スロット
            </label>
            <div className="flex flex-col gap-4">
              {memorySlots.map((slot, index) => (
                <div
                  key={index}
                  className="p-4 bg-bg-tertiary border border-cyber-secondary rounded"
                >
                  <div className="mb-2">
                    <label className="block text-xs text-text-tertiary mb-1">
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

                  <div className="mb-2">
                    <label className="block text-xs text-text-tertiary mb-1">
                      説明
                    </label>
                    <textarea
                      className="form-input resize-y"
                      value={slot.description}
                      onChange={(e) =>
                        updateMemorySlot(index, 'description', e.target.value)
                      }
                      rows={3}
                      placeholder="記憶の内容..."
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-xs text-text-tertiary mb-1">
                      タグ
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {slot.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-cyber-primary text-bg-primary text-xs rounded-full font-primary"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index, tagIndex)}
                            className="bg-transparent border-0 text-inherit cursor-pointer p-0 text-base leading-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="form-input flex-1"
                        placeholder="タグを入力..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            addTag(index, input.value);
                            input.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-danger w-full"
                    onClick={() => deleteMemorySlot(index)}
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-secondary mt-4 w-full"
              onClick={addMemorySlot}
            >
              + 記憶スロットを追加
            </button>
          </div>

          {/* Battle Frame */}
          <div className="form-group">
            <label className="form-label">
              <span className="mr-1">⚔️</span>
              戦闘フレーム (バスターシナリオ用)
            </label>
            <p className="text-[0.85rem] text-text-tertiary mb-4">
              バスターシナリオに参加する場合は戦闘フレームを設定してください
            </p>

            {/* Frame Type Selection */}
            <div className="flex flex-col gap-2 mb-4 p-4 bg-bg-tertiary rounded">
              <label
                className={`flex items-center gap-2 cursor-pointer p-2 rounded border-2 ${
                  battleFrame === null
                    ? 'bg-bg-secondary border-cyber-secondary'
                    : 'bg-transparent border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="battleFrameType"
                  checked={battleFrame === null}
                  onChange={() => removeBattleFrame()}
                  className="cursor-pointer"
                />
                <span className="font-bold">なし</span>
                <span className="text-xs text-text-tertiary">
                  (戦闘フレームを使用しない)
                </span>
              </label>

              <label
                className={`flex items-center gap-2 cursor-pointer p-2 rounded border-2 ${
                  battleFrame?.type === 'basic'
                    ? 'bg-bg-secondary border-nature-accent'
                    : 'bg-transparent border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="battleFrameType"
                  checked={battleFrame?.type === 'basic'}
                  onChange={() => createBattleFrame('basic')}
                  className="cursor-pointer"
                />
                <span className="font-bold">ベーシック</span>
                <span className="text-xs text-text-tertiary">(バランス型)</span>
              </label>

              <label
                className={`flex items-center gap-2 cursor-pointer p-2 rounded border-2 ${
                  battleFrame?.type === 'light'
                    ? 'bg-bg-secondary border-nature-accent'
                    : 'bg-transparent border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="battleFrameType"
                  checked={battleFrame?.type === 'light'}
                  onChange={() => createBattleFrame('light')}
                  className="cursor-pointer"
                />
                <span className="font-bold">ライト</span>
                <span className="text-xs text-text-tertiary">(高機動型)</span>
              </label>

              <label
                className={`flex items-center gap-2 cursor-pointer p-2 rounded border-2 ${
                  battleFrame?.type === 'heavy'
                    ? 'bg-bg-secondary border-nature-accent'
                    : 'bg-transparent border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="battleFrameType"
                  checked={battleFrame?.type === 'heavy'}
                  onChange={() => createBattleFrame('heavy')}
                  className="cursor-pointer"
                />
                <span className="font-bold">ヘビー</span>
                <span className="text-xs text-text-tertiary">(重装甲型)</span>
              </label>
            </div>

            {battleFrame ? (
              <div className="p-4 bg-bg-tertiary border-2 border-nature-accent rounded">
                <div className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-text-tertiary mb-1">
                      HP (ヒットポイント)
                    </label>
                    <p className="text-[0.7rem] text-text-tertiary mb-1">
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
                    <label className="block text-xs text-text-tertiary mb-1">
                      回避値
                    </label>
                    <p className="text-[0.7rem] text-text-tertiary mb-1">
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
                    <label className="block text-xs text-text-tertiary mb-1">
                      装甲値
                    </label>
                    <p className="text-[0.7rem] text-text-tertiary mb-1">
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
                    <label className="block text-xs text-text-tertiary mb-1">
                      初期カウント
                    </label>
                    <p className="text-[0.7rem] text-text-tertiary mb-1">
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
                    <label className="block text-xs text-text-tertiary mb-1">
                      移動力
                    </label>
                    <p className="text-[0.7rem] text-text-tertiary mb-1">
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
                    <label className="block text-xs text-text-tertiary mb-1">
                      サイズ
                    </label>
                    <p className="text-[0.7rem] text-text-tertiary mb-1">
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

          {/* Battle Styles */}
          <div className="form-group">
            <label className="form-label">
              <span className="mr-1">⚡</span>
              戦闘スタイル (CP消費: 1スタイル30点)
            </label>
            <p className="text-[0.85rem] text-(--text-tertiary) mb-4">
              複数のスタイルを習得できます。スタイルごとにステータス補正と戦闘モジュールを取得します
            </p>

            <div className="flex flex-col gap-4">
              {(Object.keys(BATTLE_STYLES) as BattleStyleType[]).map((key) => {
                const style = BATTLE_STYLES[key];
                const isSelected = battleStyles.includes(key);
                const modifierText = [];

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

                return (
                  <label
                    key={key}
                    className={`flex items-center gap-2 cursor-pointer p-4 rounded border-2 ${
                      isSelected
                        ? 'bg-(--bg-secondary) border-(--color-nature-accent)'
                        : 'bg-(--bg-tertiary) border-transparent'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleBattleStyle(key)}
                      className="cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-base">
                          {style.name}
                        </span>
                        <span className="text-xs text-(--text-tertiary)">
                          (CP: {style.cpCost})
                        </span>
                      </div>
                      <p className="text-[0.85rem] text-(--text-secondary) mb-1">
                        {style.description}
                      </p>
                      {modifierText.length > 0 && (
                        <p className="text-xs text-(--color-nature-accent)">
                          補正: {modifierText.join(', ')}
                        </p>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            {battleStyles.length > 0 && (
              <div className="mt-4 p-4 bg-(--bg-tertiary) rounded border border-(--color-nature-accent)">
                <p className="text-[0.85rem] text-(--text-secondary)">
                  選択中: {battleStyles.length}スタイル / 合計CP消費:{' '}
                  {battleStyles.length * 30}点
                </p>
              </div>
            )}
          </div>

          {/* Battle Commands */}
          {battleStyles.length > 0 && (
            <div className="form-group">
              <label className="form-label">
                <span className="mr-1">💾</span>
                戦闘モジュール (習得したスタイルに応じて選択可能)
              </label>
              <p className="text-[0.85rem] text-(--text-tertiary) mb-4">
                習得した戦闘スタイルのタグを持つモジュールを取得できます。初期CP:
                100点
              </p>

              {getAvailableCommandsByStyle().length === 0 ? (
                <div className="p-4 bg-(--bg-tertiary) rounded text-center text-(--text-tertiary)">
                  戦闘スタイルを選択すると、対応する戦闘モジュールが表示されます
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mb-4">
                    {getAvailableCommandsByStyle().map((cmd) => {
                      const isSelected = battleCommands.includes(cmd.name);
                      return (
                        <div
                          key={cmd.name}
                          onClick={() => toggleBattleCommand(cmd.name)}
                          className={`cursor-pointer transition-all duration-200 relative ${
                            isSelected
                              ? 'opacity-100 scale-100'
                              : 'opacity-70 scale-[0.98]'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-(--color-nature-accent) text-(--bg-primary) px-2 py-1 rounded text-xs font-bold z-10">
                              ✓ 習得済み
                            </div>
                          )}
                          <BattleCommandCard
                            name={cmd.name}
                            cp={cmd.cp}
                            timing={cmd.timing}
                            target={cmd.target}
                            range={cmd.range}
                            cost={cmd.cost}
                            effect={cmd.effect}
                            flavor={cmd.flavor}
                            tags={cmd.tags}
                            details={cmd.details}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-(--bg-tertiary) rounded border border-(--color-cyber-primary)">
                    <p className="text-[0.9rem] text-(--text-secondary) mb-2">
                      <strong>CP消費状況</strong>
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 text-[0.85rem] text-(--text-tertiary)">
                      <div>戦闘スタイル: {calculateTotalCP().styleCost}点</div>
                      <div>
                        戦闘モジュール: {calculateTotalCP().commandCost}点
                      </div>
                      <div
                        className={`font-bold ${
                          calculateTotalCP().total > 100
                            ? 'text-[#ff6b6b]'
                            : 'text-(--color-nature-accent)'
                        }`}
                      >
                        合計: {calculateTotalCP().total} / 100点
                      </div>
                    </div>
                    {calculateTotalCP().total > 100 && (
                      <p className="mt-2 text-[#ff6b6b] text-[0.85rem]">
                        ⚠️
                        CP上限を超えています。スタイルまたはモジュールを減らしてください。
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {error ? (
            <p className="text-(--color-cyber-accent) mb-4">{error}</p>
          ) : null}

          <div className="flex gap-4">
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
