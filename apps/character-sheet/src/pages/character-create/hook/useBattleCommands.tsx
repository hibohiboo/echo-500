import { useBattleCommandFromSpreadsheet } from '@echo-500/frontend-common/battleCommand/hooks/useBattleCommandFromSpreadsheet';

export const useBattleCommands = () => {
  const { data: battleCommands } = useBattleCommandFromSpreadsheet();

  return { availableCommands: battleCommands };
};
