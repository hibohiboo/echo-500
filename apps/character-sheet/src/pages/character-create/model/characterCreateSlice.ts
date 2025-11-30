import { generateUUID } from '@echo-500/utility';
import { createSlice } from '@reduxjs/toolkit';
import { createInitialMemorySlots } from '@/entities/character';
import type { GraphDbMemoryNode } from '@echo-500/schema';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CharacterCreateState {
  name: string;
  isSubmitting: boolean;
  memorySlots: GraphDbMemoryNode[];
}

const initialState: CharacterCreateState = {
  name: '',
  isSubmitting: false,
  memorySlots: createInitialMemorySlots().map((slot) => ({
    ...slot,
    id: generateUUID(),
  })),
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
} = characterCreateSlice.actions;

export default characterCreateSlice.reducer;
