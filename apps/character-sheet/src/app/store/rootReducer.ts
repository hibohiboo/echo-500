import { combineReducers, type UnknownAction } from '@reduxjs/toolkit';
import { battleCommandSlice } from '@/entities/battleCommand';
import { playerCharacterSlice } from '@/entities/playerCharacter';

const combinedReducer = combineReducers({
  [playerCharacterSlice.reducerPath]: playerCharacterSlice.reducer,
  [battleCommandSlice.reducerPath]: battleCommandSlice.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

export const rootReducer = (
  state: CombinedState | undefined,
  action: UnknownAction,
) => combinedReducer(state, action);

export type RootReducer = typeof rootReducer;
