import { useState } from 'react';
import type { BattleStyleType } from '@/entities/character';

interface UseBattleStylesFormProps {
  initialBattleStyles: BattleStyleType[];
  initialBattleCommands: string[];
}

export function useBattleStylesForm({
  initialBattleStyles,
  initialBattleCommands,
}: UseBattleStylesFormProps) {
  const [battleStyles, setBattleStyles] =
    useState<BattleStyleType[]>(initialBattleStyles);
  const [battleCommands, setBattleCommands] =
    useState<string[]>(initialBattleCommands);

  const toggleBattleStyle = (style: BattleStyleType) => {
    if (battleStyles.includes(style)) {
      setBattleStyles(battleStyles.filter((s) => s !== style));
    } else {
      setBattleStyles([...battleStyles, style]);
    }
  };

  const toggleBattleCommand = (commandName: string) => {
    if (battleCommands.includes(commandName)) {
      setBattleCommands(battleCommands.filter((c) => c !== commandName));
    } else {
      setBattleCommands([...battleCommands, commandName]);
    }
  };

  return {
    battleStyles,
    battleCommands,
    toggleBattleStyle,
    toggleBattleCommand,
  };
}
