import { Button } from '../../shared/button';
import { Modal } from '../../shared/modal';

export interface PlayerCharacterUpdateModalProps {
  /** モーダルの表示状態 */
  isOpen: boolean;
  /** 閉じるコールバック */
  onClose: () => void;
  /** プレイヤーキャラクター更新コールバック */
  onSubmit: (params: { name: string }) => Promise<void>;
  /** 現在の名前（初期値） */
  currentName: string;
  /** ローディング状態 */
  isLoading?: boolean;
}

/**
 * プレイヤーキャラクター更新モーダル
 */
export function PlayerCharacterUpdateModal({
  isOpen,
  onClose,
  onSubmit,
  currentName,
  isLoading = false,
}: PlayerCharacterUpdateModalProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;

    if (!name.trim()) {
      alert('プレイヤーキャラクター名を入力してください');
      return;
    }

    await onSubmit({ name: name.trim() });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="プレイヤーキャラクターを編集">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="player-character-update-name"
            className="block text-sm font-medium mb-1"
          >
            キャラクター名 <span className="text-red-500">*</span>
          </label>
          <input
            id="player-character-update-name"
            name="name"
            type="text"
            defaultValue={currentName}
            placeholder="名前を入力"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            disabled={isLoading}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? '更新中...' : '更新'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
