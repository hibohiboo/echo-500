import { generateUUID } from '@echo-500/utility';
import { battleCommandGraphApi } from '../api/battleCommandGraphApi';
import type {
  BattleCommandFormData,
  GraphDbBattleCommandNode,
} from '@echo-500/schema';

/**
 * BattleCommandノードを作成（リンクはしない）
 */
export const createBattleCommandNode = async (
  data: BattleCommandFormData,
): Promise<GraphDbBattleCommandNode> => {
  const id = generateUUID();
  return battleCommandGraphApi.create({ id, ...data });
};

/**
 * 重複チェック
 */
export const checkDuplicateBattleCommand = (
  characterId: string,
  className: string,
  commandName: string,
): Promise<boolean> =>
  battleCommandGraphApi.checkDuplicate(characterId, className, commandName);

/**
 * PlayerCharacterとBattleCommandをリンク
 */
export const linkBattleCommandToCharacter = (
  characterId: string,
  commandId: string,
  sortOrder: number,
): Promise<void> =>
  battleCommandGraphApi.linkToCharacter(characterId, commandId, sortOrder);

/**
 * PlayerCharacterとBattleCommandのリンクを解除
 */
export const unlinkBattleCommandFromCharacter = (
  characterId: string,
  commandId: string,
): Promise<void> =>
  battleCommandGraphApi.unlinkFromCharacter(characterId, commandId);

/**
 * バトルコマンドの並び順を更新
 */
export const updateBattleCommandSortOrder = (
  characterId: string,
  commandId: string,
  sortOrder: number,
): Promise<void> =>
  battleCommandGraphApi.updateSortOrder(characterId, commandId, sortOrder);

/**
 * BattleCommandノードを削除
 */
export const deleteBattleCommandNode = (commandId: string): Promise<void> =>
  battleCommandGraphApi.delete(commandId);
