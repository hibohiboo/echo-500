import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMemories,
  createAndLinkMemory,
  updateMemory,
  deleteMemory,
  unlinkMemory,
  updateMemorySortOrder as updateMemorySortOrderAction,
} from '../actions/memoryManagementActions';
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
  extraReducers: (builder) => {
    // fetchMemories
    builder
      .addCase(fetchMemories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMemories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memoriesByCharacter[action.payload.characterId] =
          action.payload.memories;
      })
      .addCase(fetchMemories.rejected, (state) => {
        state.isLoading = false;
      });

    // createAndLinkMemory
    builder
      .addCase(createAndLinkMemory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAndLinkMemory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memoriesByCharacter[action.payload.characterId] =
          action.payload.memories;
      })
      .addCase(createAndLinkMemory.rejected, (state) => {
        state.isLoading = false;
      });

    // updateMemory
    builder
      .addCase(updateMemory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memoriesByCharacter[action.payload.characterId] =
          action.payload.memories;
      })
      .addCase(updateMemory.rejected, (state) => {
        state.isLoading = false;
      });

    // deleteMemory
    builder
      .addCase(deleteMemory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMemory.fulfilled, (state, action) => {
        state.isLoading = false;
        const { characterId, memoryId } = action.payload;
        if (state.memoriesByCharacter[characterId]) {
          state.memoriesByCharacter[characterId] = state.memoriesByCharacter[
            characterId
          ].filter((mem) => mem.id !== memoryId);
        }
      })
      .addCase(deleteMemory.rejected, (state) => {
        state.isLoading = false;
      });

    // unlinkMemory
    builder
      .addCase(unlinkMemory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unlinkMemory.fulfilled, (state, action) => {
        state.isLoading = false;
        const { characterId, memoryId } = action.payload;
        if (state.memoriesByCharacter[characterId]) {
          state.memoriesByCharacter[characterId] = state.memoriesByCharacter[
            characterId
          ].filter((mem) => mem.id !== memoryId);
        }
      })
      .addCase(unlinkMemory.rejected, (state) => {
        state.isLoading = false;
      });

    // updateMemorySortOrder
    builder
      .addCase(updateMemorySortOrderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemorySortOrderAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const { characterId, memoryId, sortOrder } = action.payload;
        if (state.memoriesByCharacter[characterId]) {
          const memory = state.memoriesByCharacter[characterId].find(
            (mem) => mem.id === memoryId,
          );
          if (memory) {
            memory.sortOrder = sortOrder;
          }
        }
      })
      .addCase(updateMemorySortOrderAction.rejected, (state) => {
        state.isLoading = false;
      });
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
