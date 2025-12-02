import { createSlice } from '@reduxjs/toolkit';
import type { PlayerCharacterMemory } from '@echo-500/schema';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MemoryState {
  // characterId -> Memory[]のマップ
  memoriesByCharacter: Record<string, PlayerCharacterMemory[]>;
  isLoading: boolean;
}

const initialState: MemoryState = {
  memoriesByCharacter: {},
  isLoading: false,
};

export const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    // メモリーリストをセット
    setCharacterMemories: (
      state,
      action: PayloadAction<{
        characterId: string;
        memories: PlayerCharacterMemory[];
      }>,
    ) => {
      state.memoriesByCharacter[action.payload.characterId] =
        action.payload.memories;
    },

    // メモリーを追加
    addMemory: (
      state,
      action: PayloadAction<{
        characterId: string;
        memory: PlayerCharacterMemory;
      }>,
    ) => {
      const { characterId, memory } = action.payload;
      if (!state.memoriesByCharacter[characterId]) {
        state.memoriesByCharacter[characterId] = [];
      }
      state.memoriesByCharacter[characterId].push(memory);
    },

    // メモリーを削除
    removeMemory: (
      state,
      action: PayloadAction<{ characterId: string; memoryId: string }>,
    ) => {
      const { characterId, memoryId } = action.payload;
      if (state.memoriesByCharacter[characterId]) {
        state.memoriesByCharacter[characterId] = state.memoriesByCharacter[
          characterId
        ].filter((mem) => mem.id !== memoryId);
      }
    },

    // 並び順を更新
    updateSortOrder: (
      state,
      action: PayloadAction<{
        characterId: string;
        memoryId: string;
        sortOrder: number;
      }>,
    ) => {
      const { characterId, memoryId, sortOrder } = action.payload;
      if (state.memoriesByCharacter[characterId]) {
        const memory = state.memoriesByCharacter[characterId].find(
          (mem) => mem.id === memoryId,
        );
        if (memory) {
          memory.sortOrder = sortOrder;
        }
      }
    },

    // キャラクター削除時にメモリーもクリア
    clearCharacterMemories: (state, action: PayloadAction<string>) => {
      delete state.memoriesByCharacter[action.payload];
    },

    // ローディング状態
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCharacterMemories,
  addMemory,
  removeMemory,
  updateSortOrder,
  clearCharacterMemories,
  setIsLoading,
} = memorySlice.actions;

export default memorySlice.reducer;
