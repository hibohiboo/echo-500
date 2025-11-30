import { combineReducers, type UnknownAction } from '@reduxjs/toolkit';
import { battleCommandSlice } from '@/entities/battleCommand';
import { playerCharacterSlice } from '@/entities/playerCharacter';
import { characterCreateSlice } from '@/pages/character-create';

const combinedReducer = combineReducers({
  [playerCharacterSlice.reducerPath]: playerCharacterSlice.reducer,
  [battleCommandSlice.reducerPath]: battleCommandSlice.reducer,
  [characterCreateSlice.reducerPath]: characterCreateSlice.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

export const rootReducer = (
  state: CombinedState | undefined,
  action: UnknownAction,
) => combinedReducer(state, action);

export type RootReducer = typeof rootReducer;
