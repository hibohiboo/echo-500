import { generateUUID } from '@echo-500/utility';
import type { AppDispatch } from '@/app/store';
import { battleCommandGraphApi } from '../api/battleCommandGraphApi';
import {
  setCharacterCommands,
  removeCommand,
  updateSortOrder as updateSortOrderState,
  setIsLoading,
} from '../model/battleCommandSlice';
import type { BattleCommandFormData } from '@echo-500/schema';

/**
 * プレイヤーキャラクターのバトルコマンド一覧を取得
 */
export const fetchBattleCommands =
  (characterId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const commands = await battleCommandGraphApi.getBattleCommands(characterId);
      dispatch(setCharacterCommands({ characterId, commands }));
    } catch (error) {
      console.error('Failed to fetch battle commands:', error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

/**
 * バトルコマンドを作成してキャラクターにリンク
 */
export const createBattleCommand =
  (characterId: string, data: BattleCommandFormData, sortOrder: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const id = generateUUID();

      // 1. 重複チェック
      const isDuplicate = await battleCommandGraphApi.checkDuplicate(
        characterId,
        data.class,
        data.name,
      );
      if (isDuplicate) {
        throw new Error('同じクラス・名前のコマンドが既に存在します');
      }

      // 2. BattleCommandノードを作成
      await battleCommandGraphApi.create({ id, ...data });

      // 3. キャラクターにリンク
      await battleCommandGraphApi.linkToCharacter(characterId, id, sortOrder);

      // 4. Reduxステートを更新（再取得して最新状態に）
      const commands = await battleCommandGraphApi.getBattleCommands(characterId);
      dispatch(setCharacterCommands({ characterId, commands }));
    } catch (error) {
      console.error('Failed to create battle command:', error);
      throw error;
    }
  };

/**
 * バトルコマンドのリンクを解除
 */
export const unlinkBattleCommand =
  (characterId: string, commandId: string) => async (dispatch: AppDispatch) => {
    try {
      await battleCommandGraphApi.unlinkFromCharacter(characterId, commandId);
      dispatch(removeCommand({ characterId, commandId }));
    } catch (error) {
      console.error('Failed to unlink battle command:', error);
      throw error;
    }
  };

/**
 * バトルコマンドを削除（ノード自体を削除）
 */
export const deleteBattleCommand =
  (characterId: string, commandId: string) => async (dispatch: AppDispatch) => {
    try {
      await battleCommandGraphApi.delete(commandId);
      dispatch(removeCommand({ characterId, commandId }));
    } catch (error) {
      console.error('Failed to delete battle command:', error);
      throw error;
    }
  };

/**
 * バトルコマンドの並び順を更新
 */
export const updateBattleCommandSortOrder =
  (characterId: string, commandId: string, sortOrder: number) =>
  async (dispatch: AppDispatch) => {
    try {
      await battleCommandGraphApi.updateSortOrder(characterId, commandId, sortOrder);
      dispatch(updateSortOrderState({ characterId, commandId, sortOrder }));
    } catch (error) {
      console.error('Failed to update sort order:', error);
      throw error;
    }
  };
