import type { GraphDbMemoryNode } from '@echo-500/schema';

export const MemoryForm = (args: {
  slot: GraphDbMemoryNode;
  removeTag: (id: string, tagIndex: number) => void;
  updateMemorySlot: (
    id: string,
    field: keyof GraphDbMemoryNode,
    value: string,
  ) => void;
  addTag: (id: string, tag: string) => void;
  deleteMemorySlot: (id: string) => void;
}) => {
  const { slot, updateMemorySlot, removeTag, addTag, deleteMemorySlot } = args;
  return (
    <div className="p-4 bg-bg-tertiary border border-cyber-secondary rounded">
      <div className="mb-2">
        <label className="block text-xs text-text-tertiary mb-1">
          タイトル
        </label>
        <input
          type="text"
          className="form-input"
          value={slot.title}
          onChange={(e) => updateMemorySlot(slot.id, 'title', e.target.value)}
          placeholder="記憶のタイトル..."
        />
      </div>

      <div className="mb-2">
        <label className="block text-xs text-text-tertiary mb-1">説明</label>
        <textarea
          className="form-input resize-y"
          value={slot.description}
          onChange={(e) =>
            updateMemorySlot(slot.id, 'description', e.target.value)
          }
          rows={3}
          placeholder="記憶の内容..."
        />
      </div>

      <div className="mb-2">
        <label className="block text-xs text-text-tertiary mb-1">タグ</label>
        <div className="flex flex-wrap gap-1 mb-1">
          {slot.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="inline-flex items-center gap-1 px-2 py-1 bg-cyber-primary text-bg-primary text-xs rounded-full font-primary"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(slot.id, tagIndex)}
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
                addTag(slot.id, input.value);
                input.value = '';
              }
            }}
          />
        </div>
      </div>

      <button
        type="button"
        className="btn btn-danger w-full"
        onClick={() => deleteMemorySlot(slot.id)}
      >
        削除
      </button>
    </div>
  );
};
