import { useBattleCommandFromSpreadsheet } from '@echo-500/frontend-common/battleCommand/hooks/useBattleCommandFromSpreadsheet';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { toggleBattleCommand } from '../model/characterEditSlice';
import type { PlayerCharacterBattleCommand } from '@echo-500/schema';

export const useBattleCommands = () => {
  const dispatch = useAppDispatch();
  const { data: battleCommands } = useBattleCommandFromSpreadsheet();
  const selectedBattleCommands = useAppSelector(
    (state) => state.characterEdit.selectedBattleCommands,
  );

  const handleToggleBattleCommand = (command: PlayerCharacterBattleCommand) => {
    dispatch(toggleBattleCommand(command));
  };

  return {
    availableCommands: battleCommands,
    selectedBattleCommands,
    toggleBattleCommand: handleToggleBattleCommand,
  };
};
