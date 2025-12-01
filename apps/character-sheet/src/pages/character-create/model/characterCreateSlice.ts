import { generateUUID } from '@echo-500/utility';
import { createSlice } from '@reduxjs/toolkit';
import { createInitialMemorySlots } from '@/entities/character';
import type {
  GraphDbMemoryNode,
  PlayerCharacterBattleCommand,
} from '@echo-500/schema';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CharacterCreateState {
  name: string;
  isSubmitting: boolean;
  memorySlots: GraphDbMemoryNode[];
  selectedBattleCommands: PlayerCharacterBattleCommand[];
}

const initialState: CharacterCreateState = {
  name: '',
  isSubmitting: false,
  memorySlots: createInitialMemorySlots().map((slot) => ({
    ...slot,
    id: generateUUID(),
  })),
  selectedBattleCommands: [],
};

export const characterCreateSlice = createSlice({
  name: 'characterCreate',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    resetForm: (state) => {
      state.name = '';
      state.isSubmitting = false;
      state.memorySlots = initialState.memorySlots;
      state.selectedBattleCommands = [];
    },

    // Memory Slots 操作（id基準）
    updateMemorySlot: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof GraphDbMemoryNode;
        value: string | string[];
      }>,
    ) => {
      const { id, field, value } = action.payload;
      const slot = state.memorySlots.find((s) => s.id === id);
      if (slot) {
        (slot as Record<string, unknown>)[field] = value;
      }
    },
    addTag: (
      state,
      action: PayloadAction<{ id: string; tag: string }>,
    ) => {
      const { id, tag } = action.payload;
      const trimmedTag = tag.trim();
      if (!trimmedTag) return;

      const slot = state.memorySlots.find((s) => s.id === id);
      if (!slot) return;

      if (slot.tags.includes(trimmedTag)) return;

      slot.tags = [...slot.tags, trimmedTag];
    },
    removeTag: (
      state,
      action: PayloadAction<{ id: string; tagIndex: number }>,
    ) => {
      const { id, tagIndex } = action.payload;
      const slot = state.memorySlots.find((s) => s.id === id);
      if (!slot) return;

      slot.tags = slot.tags.filter((_, i) => i !== tagIndex);
    },
    deleteMemorySlot: (state, action: PayloadAction<string>) => {
      state.memorySlots = state.memorySlots.filter(
        (s) => s.id !== action.payload,
      );
    },
    addMemorySlot: (state) => {
      state.memorySlots.push({
        id: generateUUID(),
        title: '',
        description: '',
        tags: [],
      });
    },

    // Battle Commands 操作
    toggleBattleCommand: (
      state,
      action: PayloadAction<PlayerCharacterBattleCommand>,
    ) => {
      const command = action.payload;
      const index = state.selectedBattleCommands.findIndex(
        (c) => c.name === command.name,
      );

      if (index >= 0) {
        // 既に選択されている場合は削除
        state.selectedBattleCommands.splice(index, 1);
      } else {
        // 選択されていない場合は追加
        state.selectedBattleCommands.push(command);
      }
    },
  },
});

export const {
  setName,
  setIsSubmitting,
  resetForm,
  updateMemorySlot,
  addTag,
  removeTag,
  deleteMemorySlot,
  addMemorySlot,
  toggleBattleCommand,
} = characterCreateSlice.actions;

export default characterCreateSlice.reducer;
