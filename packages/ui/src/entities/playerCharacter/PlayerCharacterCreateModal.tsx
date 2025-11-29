import { useState } from 'react';
import { Button } from '../../shared/button';
import { Modal } from '../../shared/modal';

export interface PlayerCharacterCreateModalProps {
  /** モーダルの表示状態 */
  isOpen: boolean;
  /** 閉じるコールバック */
  onClose: () => void;
  /** プレイヤーキャラクター作成コールバック */
  onSubmit: (params: { name: string }) => Promise<void>;
  /** ローディング状態 */
  isLoading?: boolean;
}

/**
 * プレイヤーキャラクター作成モーダル
 */
export function PlayerCharacterCreateModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: PlayerCharacterCreateModalProps) {
  const [name, setName] = useState('');

  const handleClose = () => {
    setName('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('プレイヤーキャラクター名を入力してください');
      return;
    }

    await onSubmit({ name: name.trim() });
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="プレイヤーキャラクターを作成">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="player-character-name"
            className="block text-sm font-medium mb-1"
          >
            キャラクター名 <span className="text-red-500">*</span>
          </label>
          <input
            id="player-character-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前を入力"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            onClick={handleClose}
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
            {isLoading ? '作成中...' : '作成'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
