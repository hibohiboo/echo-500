import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createMemoryNode,
  updateMemoryNode,
  deleteMemoryNode,
  linkMemoryToCharacter,
  unlinkMemoryFromCharacter,
  updateMemorySortOrder as updateSortOrderApi,
} from '@/entities/memory';
import { fetchPlayerCharacterMemories } from '@/entities/playerCharacter/actions/playerCharacterMemoryActions';
import type {
  GraphDbMemoryNode,
  PlayerCharacterMemory,
} from '@echo-500/schema';

/**
 * プレイヤーキャラクターのメモリー一覧を取得
 */
export const fetchMemories = createAsyncThunk<
  { characterId: string; memories: PlayerCharacterMemory[] },
  { characterId: string }
>('memory/fetchMemories', async ({ characterId }) => {
  const memories = await fetchPlayerCharacterMemories(characterId);
  return { characterId, memories };
});

/**
 * メモリーを作成してキャラクターにリンク
 */
export const createAndLinkMemory = createAsyncThunk<
  { characterId: string; memories: PlayerCharacterMemory[] },
  { characterId: string; data: GraphDbMemoryNode; sortOrder: number }
>('memory/createAndLink', async ({ characterId, data, sortOrder }) => {
  // 1. Memoryノードを作成
  await createMemoryNode(data);

  // 2. キャラクターにリンク
  await linkMemoryToCharacter(characterId, data.id, sortOrder);

  // 3. 最新のメモリー一覧を取得
  const memories = await fetchPlayerCharacterMemories(characterId);
  return { characterId, memories };
});

/**
 * メモリーを更新
 */
export const updateMemory = createAsyncThunk<
  { characterId: string; memories: PlayerCharacterMemory[] },
  { characterId: string; data: GraphDbMemoryNode }
>('memory/update', async ({ characterId, data }) => {
  // 1. Memoryノードを更新
  await updateMemoryNode(data);

  // 2. 最新のメモリー一覧を取得
  const memories = await fetchPlayerCharacterMemories(characterId);
  return { characterId, memories };
});

/**
 * メモリーのリンクを解除
 */
export const unlinkMemory = createAsyncThunk<
  { characterId: string; memoryId: string },
  { characterId: string; memoryId: string }
>('memory/unlink', async ({ characterId, memoryId }) => {
  await unlinkMemoryFromCharacter(characterId, memoryId);
  return { characterId, memoryId };
});

/**
 * メモリーを削除（ノード自体を削除）
 */
export const deleteMemory = createAsyncThunk<
  { characterId: string; memoryId: string },
  { characterId: string; memoryId: string }
>('memory/delete', async ({ characterId, memoryId }) => {
  await deleteMemoryNode(memoryId);
  return { characterId, memoryId };
});

/**
 * メモリーの並び順を更新
 */
export const updateMemorySortOrder = createAsyncThunk<
  { characterId: string; memoryId: string; sortOrder: number },
  { characterId: string; memoryId: string; sortOrder: number }
>('memory/updateSortOrder', async ({ characterId, memoryId, sortOrder }) => {
  await updateSortOrderApi(characterId, memoryId, sortOrder);
  return { characterId, memoryId, sortOrder };
});
