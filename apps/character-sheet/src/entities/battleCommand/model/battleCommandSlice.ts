import { createSlice } from '@reduxjs/toolkit';
import type { PlayerCharacterBattleCommand } from '@echo-500/schema';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BattleCommandState {
  // characterId -> BattleCommand[]のマップ
  commandsByCharacter: Record<string, PlayerCharacterBattleCommand[]>;
  isLoading: boolean;
}

const initialState: BattleCommandState = {
  commandsByCharacter: {},
  isLoading: false,
};

export const battleCommandSlice = createSlice({
  name: 'battleCommand',
  initialState,
  reducers: {
    // バトルコマンドリストをセット
    setCharacterCommands: (
      state,
      action: PayloadAction<{ characterId: string; commands: PlayerCharacterBattleCommand[] }>,
    ) => {
      state.commandsByCharacter[action.payload.characterId] = action.payload.commands;
    },

    // バトルコマンドを追加
    addCommand: (
      state,
      action: PayloadAction<{ characterId: string; command: PlayerCharacterBattleCommand }>,
    ) => {
      const { characterId, command } = action.payload;
      if (!state.commandsByCharacter[characterId]) {
        state.commandsByCharacter[characterId] = [];
      }
      state.commandsByCharacter[characterId].push(command);
    },

    // バトルコマンドを削除
    removeCommand: (
      state,
      action: PayloadAction<{ characterId: string; commandId: string }>,
    ) => {
      const { characterId, commandId } = action.payload;
      if (state.commandsByCharacter[characterId]) {
        state.commandsByCharacter[characterId] = state.commandsByCharacter[characterId].filter(
          (cmd) => cmd.id !== commandId,
        );
      }
    },

    // 並び順を更新
    updateSortOrder: (
      state,
      action: PayloadAction<{ characterId: string; commandId: string; sortOrder: number }>,
    ) => {
      const { characterId, commandId, sortOrder } = action.payload;
      if (state.commandsByCharacter[characterId]) {
        const command = state.commandsByCharacter[characterId].find(
          (cmd) => cmd.id === commandId,
        );
        if (command) {
          command.sortOrder = sortOrder;
        }
      }
    },

    // キャラクター削除時にコマンドもクリア
    clearCharacterCommands: (state, action: PayloadAction<string>) => {
      delete state.commandsByCharacter[action.payload];
    },

    // ローディング状態
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCharacterCommands,
  addCommand,
  removeCommand,
  updateSortOrder,
  clearCharacterCommands,
  setIsLoading,
} = battleCommandSlice.actions;

export default battleCommandSlice.reducer;
