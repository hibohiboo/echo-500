import { memoryGraphRepository } from '@echo-500/graphdb';
import {
  parseToGraphDbMemoryNodeList,
  parseLinkMemoryPayload,
  parseUnlinkMemoryPayload,
  parseUpdateMemorySortOrder,
  parseCreateMemoryParams,
  parseUpdateMemoryParams,
  parseMemoryId,
} from '@echo-500/schema';

// ===== メモリー GraphDB操作ハンドラー =====
export const memoryGraphHandlers = [
  {
    type: 'memory:create',
    handler: async (payload: unknown) => {
      const data = parseCreateMemoryParams(payload);
      console.log('[Memory Worker] Creating memory with ID:', data.id);
      console.log('[Memory Worker] Data:', data);

      const result = await memoryGraphRepository.create(data);
      console.log('[Memory Worker] Repository result:', result);

      const memories = parseToGraphDbMemoryNodeList(result);
      console.log('[Memory Worker] Parsed memories:', memories);

      if (!memories || memories.length === 0) {
        throw new Error('Failed to create memory: empty result');
      }

      return { data: memories[0] };
    },
  },
  {
    type: 'memory:update',
    handler: async (payload: unknown) => {
      const data = parseUpdateMemoryParams(payload);
      const result = await memoryGraphRepository.update(data);
      const memories = parseToGraphDbMemoryNodeList(result);

      if (!memories || memories.length === 0) {
        throw new Error('Failed to update memory: empty result');
      }

      return { data: memories[0] };
    },
  },
  {
    type: 'memory:linkToCharacter',
    handler: async (payload: unknown) => {
      const { characterId, memoryId, sortOrder } =
        parseLinkMemoryPayload(payload);
      await memoryGraphRepository.linkToCharacter(
        characterId,
        memoryId,
        sortOrder,
      );
      return { success: true };
    },
  },
  {
    type: 'memory:unlinkFromCharacter',
    handler: async (payload: unknown) => {
      const { characterId, memoryId } = parseUnlinkMemoryPayload(payload);
      await memoryGraphRepository.unlinkFromCharacter(characterId, memoryId);
      return { success: true };
    },
  },
  {
    type: 'memory:updateSortOrder',
    handler: async (payload: unknown) => {
      const { characterId, memoryId, sortOrder } =
        parseUpdateMemorySortOrder(payload);
      await memoryGraphRepository.updateSortOrder(
        characterId,
        memoryId,
        sortOrder,
      );
      return { success: true };
    },
  },
  {
    type: 'memory:delete',
    handler: async (payload: unknown) => {
      const { id } = parseMemoryId(payload);
      await memoryGraphRepository.delete(id);
      return { success: true };
    },
  },
] as const;
type MemoryGraphHandler = (typeof memoryGraphHandlers)[number];

export type MemoryGraphHandlerMap = {
  [H in MemoryGraphHandler as H['type']]: ReturnType<H['handler']> extends Promise<{
    data: infer D;
  }>
    ? D
    : ReturnType<H['handler']> extends Promise<{ success: boolean }>
      ? void
      : never;
};
