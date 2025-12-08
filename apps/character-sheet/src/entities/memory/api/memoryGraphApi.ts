import { dbWorkerClient } from '@/workers/dbWorkerClient';
import type { GraphDbMemoryNode } from '@echo-500/schema';

/**
 * MemoryのGraphDB API（IndexedDB経由）
 */
export const memoryGraphApi = {
  /**
   * Memoryノードを作成
   */
  create: (params: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }): Promise<GraphDbMemoryNode> => dbWorkerClient.request('memory:create', params),

  /**
   * Memoryノードを更新
   */
  update: (params: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }): Promise<GraphDbMemoryNode> => dbWorkerClient.request('memory:update', params),

  /**
   * Memoryノードを削除
   */
  delete: (id: string): Promise<void> =>
    dbWorkerClient.request('memory:delete', { id }),

  /**
   * PlayerCharacterにMemoryをリンク
   */
  linkToCharacter: (
    characterId: string,
    memoryId: string,
    sortOrder: number,
  ): Promise<void> =>
    dbWorkerClient.request('memory:linkToCharacter', {
      characterId,
      memoryId,
      sortOrder,
    }),

  /**
   * PlayerCharacterからMemoryのリンクを解除
   */
  unlinkFromCharacter: (characterId: string, memoryId: string): Promise<void> =>
    dbWorkerClient.request('memory:unlinkFromCharacter', {
      characterId,
      memoryId,
    }),

  /**
   * Memoryの並び順を更新
   */
  updateSortOrder: (
    characterId: string,
    memoryId: string,
    sortOrder: number,
  ): Promise<void> =>
    dbWorkerClient.request('memory:updateSortOrder', {
      characterId,
      memoryId,
      sortOrder,
    }),
};
