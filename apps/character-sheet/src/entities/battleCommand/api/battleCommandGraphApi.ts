import { dbWorkerClient } from '@/workers/dbWorkerClient';
import type {
  BattleCommandFormData,
  GraphDbBattleCommandNode,
} from '@echo-500/schema';

/**
 * バトルコマンドのGraphDB API（IndexedDB経由）
 */
export const battleCommandGraphApi = {
  /**
   * BattleCommandノードを作成
   */
  create: (data: BattleCommandFormData): Promise<GraphDbBattleCommandNode> =>
    dbWorkerClient.request('battleCommand:create', data),

  /**
   * PlayerCharacterとBattleCommandをリンク
   */
  linkToCharacter: (
    characterId: string,
    commandId: string,
    sortOrder: number,
  ): Promise<void> =>
    dbWorkerClient.request('battleCommand:linkToCharacter', {
      characterId,
      commandId,
      sortOrder,
    }),

  /**
   * PlayerCharacterとBattleCommandのリンクを解除
   */
  unlinkFromCharacter: (characterId: string, commandId: string): Promise<void> =>
    dbWorkerClient.request('battleCommand:unlinkFromCharacter', {
      characterId,
      commandId,
    }),

  /**
   * バトルコマンドの並び順を更新
   */
  updateSortOrder: (
    characterId: string,
    commandId: string,
    sortOrder: number,
  ): Promise<void> =>
    dbWorkerClient.request('battleCommand:updateSortOrder', {
      characterId,
      commandId,
      sortOrder,
    }),

  /**
   * BattleCommandノードを削除
   */
  delete: (commandId: string): Promise<void> =>
    dbWorkerClient.request('battleCommand:delete', { id: commandId }),

  /**
   * 重複チェック：同じclass + nameのコマンドが既に存在するか確認
   */
  checkDuplicate: (
    characterId: string,
    className: string,
    commandName: string,
  ): Promise<boolean> =>
    dbWorkerClient.request('battleCommand:checkDuplicate', {
      characterId,
      className,
      commandName,
    }),
};
