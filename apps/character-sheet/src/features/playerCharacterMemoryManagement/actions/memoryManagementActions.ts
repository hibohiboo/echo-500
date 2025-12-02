import type { AppDispatch } from '@/app/store';
import {
  createMemoryNode,
  updateMemoryNode,
  deleteMemoryNode,
  linkMemoryToCharacter,
  unlinkMemoryFromCharacter,
  updateMemorySortOrder as updateSortOrderApi,
  updateMemorySortOrder as updateSortOrderState,
} from '@/entities/memory';
import { fetchPlayerCharacterMemories } from '@/entities/playerCharacter/actions/playerCharacterMemoryActions';
import type { GraphDbMemoryNode } from '@echo-500/schema';

/**
 * メモリーを作成してキャラクターにリンク
 */
export const createAndLinkMemory =
  (characterId: string, data: GraphDbMemoryNode, sortOrder: number) =>
  async () => {
    try {
      // 1. Memoryノードを作成
      await createMemoryNode(data);

      // 2. キャラクターにリンク
      await linkMemoryToCharacter(characterId, data.id, sortOrder);

      // 3. Reduxステートを更新（再取得して最新状態に）
      const memories = await fetchPlayerCharacterMemories(characterId);
      return memories;
    } catch (error) {
      console.error('Failed to create memory:', error);
      throw error;
    }
  };

/**
 * メモリーを更新
 */
export const updateMemory =
  (characterId: string, data: GraphDbMemoryNode) =>
  async (dispatch: AppDispatch) => {
    try {
      // 1. Memoryノードを更新
      await updateMemoryNode(data);

      // 2. Reduxステートを更新（再取得して最新状態に）
      await fetchPlayerCharacterMemories(characterId);
    } catch (error) {
      console.error('Failed to update memory:', error);
      throw error;
    }
  };

/**
 * メモリーのリンクを解除
 */
export const unlinkMemory =
  (characterId: string, memoryId: string) => async (dispatch: AppDispatch) => {
    try {
      await unlinkMemoryFromCharacter(characterId, memoryId);
    } catch (error) {
      console.error('Failed to unlink memory:', error);
      throw error;
    }
  };

/**
 * メモリーを削除（ノード自体を削除）
 */
export const deleteMemory =
  (characterId: string, memoryId: string) => async (dispatch: AppDispatch) => {
    try {
      await deleteMemoryNode(memoryId);
      dispatch(removeMemory({ characterId, memoryId }));
    } catch (error) {
      console.error('Failed to delete memory:', error);
      throw error;
    }
  };

/**
 * メモリーの並び順を更新
 */
export const updateMemorySortOrder =
  (characterId: string, memoryId: string, sortOrder: number) =>
  async (dispatch: AppDispatch) => {
    try {
      await updateSortOrderApi(characterId, memoryId, sortOrder);
      dispatch(updateSortOrderState({ characterId, memoryId, sortOrder }));
    } catch (error) {
      console.error('Failed to update sort order:', error);
      throw error;
    }
  };
