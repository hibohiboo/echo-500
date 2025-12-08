import { createSlice } from '@reduxjs/toolkit';
import type { SerializablePlayerCharacter } from '@echo-500/schema';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PlayerCharacterState {
  characters: SerializablePlayerCharacter[];
  isLoading: boolean;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  createName: string;
  editName: string;
  editingCharacter: SerializablePlayerCharacter | null;
  deletingCharacter: SerializablePlayerCharacter | null;
  isSubmitting: boolean;
  isDeleting: boolean;
}

const initialState: PlayerCharacterState = {
  characters: [],
  isLoading: false,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  createName: '',
  editName: '',
  editingCharacter: null,
  deletingCharacter: null,
  isSubmitting: false,
  isDeleting: false,
};

export const playerCharacterSlice = createSlice({
  name: 'playerCharacter',
  initialState,
  reducers: {
    // モーダル操作
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
      state.createName = '';
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
      state.createName = '';
    },
    setCreateName: (state, action: PayloadAction<string>) => {
      state.createName = action.payload;
    },
    openEditModal: (state, action: PayloadAction<SerializablePlayerCharacter>) => {
      state.isEditModalOpen = true;
      state.editingCharacter = action.payload;
      state.editName = action.payload.name;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.editingCharacter = null;
      state.editName = '';
    },
    setEditName: (state, action: PayloadAction<string>) => {
      state.editName = action.payload;
    },
    openDeleteModal: (state, action: PayloadAction<SerializablePlayerCharacter>) => {
      state.isDeleteModalOpen = true;
      state.deletingCharacter = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.deletingCharacter = null;
    },

    // データ操作
    setCharacters: (state, action: PayloadAction<SerializablePlayerCharacter[]>) => {
      state.characters = action.payload;
    },
    addCharacter: (state, action: PayloadAction<SerializablePlayerCharacter>) => {
      state.characters.push(action.payload);
    },
    updateCharacter: (state, action: PayloadAction<SerializablePlayerCharacter>) => {
      const index = state.characters.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.characters[index] = action.payload;
      }
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter((c) => c.id !== action.payload);
    },

    // ローディング状態
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setIsDeleting: (state, action: PayloadAction<boolean>) => {
      state.isDeleting = action.payload;
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  setCreateName,
  openEditModal,
  closeEditModal,
  setEditName,
  openDeleteModal,
  closeDeleteModal,
  setCharacters,
  addCharacter,
  updateCharacter,
  removeCharacter,
  setIsLoading,
  setIsSubmitting,
  setIsDeleting,
} = playerCharacterSlice.actions;

export default playerCharacterSlice.reducer;
