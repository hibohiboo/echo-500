import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CharacterCreateState {
  name: string;
  isSubmitting: boolean;
}

const initialState: CharacterCreateState = {
  name: '',
  isSubmitting: false,
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
    },
  },
});

export const { setName, setIsSubmitting, resetForm } =
  characterCreateSlice.actions;

export default characterCreateSlice.reducer;
