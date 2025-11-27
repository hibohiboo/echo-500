import { useBattleCommandData } from '@echo-500/frontend-common';
import { useMemo } from 'react';
import { BATTLE_STYLES } from '@/entities/character';
import type { Character, BattleStyleType } from '@/entities/character';
import type { BattleStyle } from '@echo-500/frontend-common';

interface UseCharacterDetailProps {
  character: Character;
}

export function useCharacterDetail({ character }: UseCharacterDetailProps) {
  const apiKey = import.meta.env.VITE_SPREAD_SHEET_API_KEY || '';
  const spreadSheetId = import.meta.env.VITE_SPREAD_SHEET_ID || '';
  const { data: availableCommands } = useBattleCommandData(
    apiKey,
    spreadSheetId,
  );

  const calculateStyleModifiers = (
    battleStyles?: BattleStyleType[],
  ): { movement: number; evasion: number } => {
    if (!battleStyles || battleStyles.length === 0) {
      return { movement: 0, evasion: 0 };
    }

    return battleStyles.reduce(
      (acc, styleKey) => {
        const style = BATTLE_STYLES[styleKey];
        return {
          movement:
            acc.movement +
            ('movement' in style.modifier ? style.modifier.movement || 0 : 0),
          evasion:
            acc.evasion +
            ('evasion' in style.modifier ? style.modifier.evasion || 0 : 0),
        };
      },
      { movement: 0, evasion: 0 },
    );
  };

  const finalStats = useMemo(() => {
    if (!character.battleFrame) {
      return null;
    }

    const baseStats = character.battleFrame.stats;
    const modifiers = calculateStyleModifiers(character.battleStyles);

    return {
      hp: baseStats.hp,
      evasion: baseStats.evasion + modifiers.evasion,
      armor: baseStats.armor,
      initialCount: baseStats.initialCount,
      movement: baseStats.movement + modifiers.movement,
      size: baseStats.size,
      modifiers,
    };
  }, [character.battleFrame, character.battleStyles]);

  const battleStylesData = useMemo<BattleStyle[]>(() => {
    if (!character.battleStyles || character.battleStyles.length === 0) {
      return [];
    }
    return character.battleStyles.map((styleKey) => BATTLE_STYLES[styleKey]);
  }, [character.battleStyles]);

  const learnedCommands = useMemo(() => {
    if (!character.battleCommands || character.battleCommands.length === 0) {
      return [];
    }
    return availableCommands.filter((cmd) =>
      character.battleCommands?.includes(cmd.name),
    );
  }, [character.battleCommands, availableCommands]);

  const totalCP = useMemo(
    () => learnedCommands.reduce((sum, cmd) => sum + cmd.cp, 0),
    [learnedCommands],
  );

  const getStyleModifierText = (style: BattleStyle): string[] => {
    const modifierText: string[] = [];

    if (style.modifier.movement !== undefined) {
      modifierText.push(
        `移動力${style.modifier.movement > 0 ? '+' : ''}${style.modifier.movement}`,
      );
    }
    if (style.modifier.evasion !== undefined) {
      modifierText.push(
        `回避値${style.modifier.evasion > 0 ? '+' : ''}${style.modifier.evasion}`,
      );
    }

    return modifierText;
  };

  return {
    character,
    finalStats,
    battleStylesData,
    learnedCommands,
    totalCP,
    getStyleModifierText,
  };
}
