import { Button } from '../../shared/button';
import { Loading } from '../../shared/loading';
import type { BattleCommand } from './types';

export interface BattleCommandListProps {
  /** バトルコマンドのリスト */
  commands: BattleCommand[];
  /** ローディング状態 */
  isLoading?: boolean;
  /** コマンドクリック時のコールバック */
  onCommandClick?: (command: BattleCommand) => void;
  /** 新規追加ボタンクリック時のコールバック */
  onAdd?: () => void;
  /** コマンド削除ボタンクリック時のコールバック */
  onDelete?: (command: BattleCommand) => void;
}

/**
 * バトルコマンド一覧コンポーネント
 */
export function BattleCommandList({
  commands,
  isLoading,
  onCommandClick,
  onAdd,
  onDelete,
}: BattleCommandListProps) {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">バトルコマンド一覧</h3>
        {onAdd && (
          <Button onClick={onAdd} variant="primary" size="sm">
            追加
          </Button>
        )}
      </div>

      {commands.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          バトルコマンドがありません
        </div>
      ) : (
        <div className="space-y-2">
          {commands.map((command) => (
            <div
              key={command.id}
              className="border border-gray-300 rounded p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onCommandClick?.(command)}
                  className="flex-1 text-left hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {command.class}
                    </span>
                    <h4 className="font-bold text-base">{command.name}</h4>
                    <span className="text-sm text-gray-600">CP: {command.cp}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                    <div>
                      <span className="font-medium">タイミング:</span> {command.timing}
                    </div>
                    <div>
                      <span className="font-medium">コスト:</span> {command.cost}
                    </div>
                    <div>
                      <span className="font-medium">射程:</span> {command.range}
                    </div>
                    <div>
                      <span className="font-medium">対象:</span> {command.target}
                    </div>
                  </div>
                  <div className="text-sm mb-2">
                    <span className="font-medium">効果:</span> {command.effect}
                  </div>
                  {command.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {command.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
                {onDelete && (
                  <Button
                    onClick={() => onDelete(command)}
                    variant="danger"
                    size="sm"
                  >
                    削除
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
