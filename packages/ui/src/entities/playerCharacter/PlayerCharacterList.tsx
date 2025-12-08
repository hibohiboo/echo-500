import { Button } from '../../shared/button';
import { Loading } from '../../shared/loading';
import type { PlayerCharacter } from './types';

export interface PlayerCharacterListProps {
  /** プレイヤーキャラクターのリスト */
  characters: PlayerCharacter[];
  /** ローディング状態 */
  isLoading?: boolean;
  /** キャラクタークリック時のコールバック */
  onCharacterClick?: (character: PlayerCharacter) => void;
  /** 新規作成ボタンクリック時のコールバック */
  onCreateNew?: () => void;
  /** キャラクター編集ボタンクリック時のコールバック */
  onEdit?: (character: PlayerCharacter) => void;
  /** キャラクター削除ボタンクリック時のコールバック */
  onDelete?: (character: PlayerCharacter) => void;
}

/**
 * プレイヤーキャラクター一覧コンポーネント
 */
export function PlayerCharacterList({
  characters,
  isLoading,
  onCharacterClick,
  onCreateNew,
  onEdit,
  onDelete,
}: PlayerCharacterListProps) {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">プレイヤーキャラクター一覧</h3>
        {onCreateNew && (
          <Button onClick={onCreateNew} variant="primary" size="sm">
            新規作成
          </Button>
        )}
      </div>

      {characters.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          プレイヤーキャラクターがありません
        </div>
      ) : (
        <div className="space-y-2">
          {characters.map((character) => (
            <div
              key={character.id}
              className="flex items-center gap-3 p-4 border border-gray-300 rounded"
            >
              <button
                type="button"
                onClick={() => onCharacterClick?.(character)}
                className="flex-1 text-left hover:bg-gray-50 p-2 rounded"
              >
                <h3 className="font-bold text-lg">{character.name}</h3>
                <p className="text-gray-500 text-sm">
                  作成日: {new Date(character.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </button>
              {onEdit && (
                <Button
                  onClick={() => onEdit(character)}
                  variant="secondary"
                  size="sm"
                >
                  編集
                </Button>
              )}
              {onDelete && (
                <Button
                  onClick={() => onDelete(character)}
                  variant="danger"
                  size="sm"
                >
                  削除
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
