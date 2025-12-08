import { useState } from 'react';
import { Button } from '../../shared/button';
import { Modal } from '../../shared/modal';
import type { BattleCommandFormData } from './types';

export interface BattleCommandFormProps {
  /** モーダルの表示状態 */
  isOpen: boolean;
  /** 閉じるコールバック */
  onClose: () => void;
  /** バトルコマンド作成コールバック */
  onSubmit: (data: BattleCommandFormData) => Promise<void>;
  /** ローディング状態 */
  isLoading?: boolean;
}

/**
 * バトルコマンド作成フォームモーダル
 */
export function BattleCommandForm({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: BattleCommandFormProps) {
  const [formData, setFormData] = useState<BattleCommandFormData>({
    class: '',
    name: '',
    cp: 0,
    timing: '',
    cost: '',
    range: '',
    effect: '',
    target: '',
    flavor: '',
    tags: [],
    details: '',
  });

  const [tagsInput, setTagsInput] = useState('');

  const handleClose = () => {
    setFormData({
      class: '',
      name: '',
      cp: 0,
      timing: '',
      cost: '',
      range: '',
      effect: '',
      target: '',
      flavor: '',
      tags: [],
      details: '',
    });
    setTagsInput('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.class.trim() || !formData.name.trim()) {
      alert('クラスとコマンド名は必須です');
      return;
    }

    // タグをカンマ区切りで分割
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    await onSubmit({ ...formData, tags });
    handleClose();
  };

  const updateField = <K extends keyof BattleCommandFormData>(
    field: K,
    value: BattleCommandFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="バトルコマンドを追加">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="class" className="block text-sm font-medium mb-1">
              クラス <span className="text-red-500">*</span>
            </label>
            <input
              id="class"
              type="text"
              value={formData.class}
              onChange={(e) => updateField('class', e.target.value)}
              placeholder="例: ファイター"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              コマンド名 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="例: 斬撃"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cp" className="block text-sm font-medium mb-1">
              CP
            </label>
            <input
              id="cp"
              type="number"
              value={formData.cp}
              onChange={(e) => updateField('cp', Number.parseInt(e.target.value, 10) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="timing" className="block text-sm font-medium mb-1">
              タイミング
            </label>
            <input
              id="timing"
              type="text"
              value={formData.timing}
              onChange={(e) => updateField('timing', e.target.value)}
              placeholder="例: アクション"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="cost" className="block text-sm font-medium mb-1">
              コスト
            </label>
            <input
              id="cost"
              type="text"
              value={formData.cost}
              onChange={(e) => updateField('cost', e.target.value)}
              placeholder="例: 気力1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="range" className="block text-sm font-medium mb-1">
              射程
            </label>
            <input
              id="range"
              type="text"
              value={formData.range}
              onChange={(e) => updateField('range', e.target.value)}
              placeholder="例: 至近"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="target" className="block text-sm font-medium mb-1">
              対象
            </label>
            <input
              id="target"
              type="text"
              value={formData.target}
              onChange={(e) => updateField('target', e.target.value)}
              placeholder="例: 単体"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="effect" className="block text-sm font-medium mb-1">
            効果
          </label>
          <textarea
            id="effect"
            value={formData.effect}
            onChange={(e) => updateField('effect', e.target.value)}
            placeholder="効果を入力"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="flavor" className="block text-sm font-medium mb-1">
            フレーバーテキスト
          </label>
          <input
            id="flavor"
            type="text"
            value={formData.flavor}
            onChange={(e) => updateField('flavor', e.target.value)}
            placeholder="フレーバーテキストを入力"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            タグ（カンマ区切り）
          </label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="例: 攻撃,物理,近接"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium mb-1">
            詳細説明
          </label>
          <textarea
            id="details"
            value={formData.details}
            onChange={(e) => updateField('details', e.target.value)}
            placeholder="詳細説明を入力"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
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
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? '追加中...' : '追加'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
