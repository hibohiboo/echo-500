import { AppContainer } from '@/shared/ui/atoms/AppContainer';
import { AppHeader } from '@/shared/ui/atoms/AppHeader';
import { useCharacterForm } from '../hook/useCharacterForm';
import { InputForm } from './InputForm';

export default function CharacterCreatePage() {
  const {
    name,
    isSubmitting,
    handleSubmit,
    onCancel,
    handleNameChange,
    memorySlots,
    updateMemorySlot,
    removeTag,
    addTag,
    deleteMemorySlot,
    addMemorySlot,
  } = useCharacterForm();
  return (
    <AppContainer>
      <AppHeader>Create new chracater</AppHeader>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <InputForm
              id="name"
              type="text"
              className="form-input"
              label="CHARACTER NAME"
              placeholder="Enter character name..."
              value={name}
              onChange={handleNameChange}
              autoFocus
              required
            />
          </div>
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
          <div className="flex gap-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AppContainer>
  );
}
