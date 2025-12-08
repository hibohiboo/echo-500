import { memoryGraphApi } from '../api/memoryGraphApi';

/**
 * Memoryノードを作成（Redux操作なし）
 */
export const createMemoryNode = (params: {
  id: string;
  title: string;
  description: string;
  tags: string[];
}) => memoryGraphApi.create(params);

/**
 * Memoryノードを更新（Redux操作なし）
 */
export const updateMemoryNode = (params: {
  id: string;
  title: string;
  description: string;
  tags: string[];
}) => memoryGraphApi.update(params);

/**
 * Memoryノードを削除（Redux操作なし）
 */
export const deleteMemoryNode = (id: string) => memoryGraphApi.delete(id);

/**
 * PlayerCharacterにMemoryをリンク（Redux操作なし）
 */
export const linkMemoryToCharacter = (
  characterId: string,
  memoryId: string,
  sortOrder: number,
) => memoryGraphApi.linkToCharacter(characterId, memoryId, sortOrder);

/**
 * PlayerCharacterからMemoryのリンクを解除（Redux操作なし）
 */
export const unlinkMemoryFromCharacter = (
  characterId: string,
  memoryId: string,
) => memoryGraphApi.unlinkFromCharacter(characterId, memoryId);

/**
 * Memoryの並び順を更新（Redux操作なし）
 */
export const updateMemorySortOrder = (
  characterId: string,
  memoryId: string,
  sortOrder: number,
) => memoryGraphApi.updateSortOrder(characterId, memoryId, sortOrder);
