import type {
  MemorySlot,
  BattleFrame,
  BattleStyleType,
  Character,
} from '@/entities/character';
import { createInitialMemorySlots } from '@/entities/character';

const defaultCharacter = {
  name: '',
  memorySlots: createInitialMemorySlots(),
  battleFrame: null,
  battleStyles: [] as BattleStyleType[],
  battleCommands: [] as string[],
};

export function getCharacterOrDefault(character?: Character) {
  if (!character) return defaultCharacter;

  return {
    name: character.name,
    memorySlots: character.memorySlots,
    battleFrame: character.battleFrame,
    battleStyles: character.battleStyles,
    battleCommands: character.battleCommands,
  };
}

export function validateCharacterForm(
  name: string,
  memorySlots: MemorySlot[],
): string | null {
  if (!name.trim()) {
    return 'Character name is required';
  }
  if (memorySlots.length === 0) {
    return 'At least one memory slot is required';
  }
  return null;
}

export function buildCharacterData(
  name: string,
  memorySlots: MemorySlot[],
  battleFrame: BattleFrame,
  battleStyles: BattleStyleType[],
  battleCommands: string[],
) {
  return {
    name: name.trim(),
    memorySlots,
    battleFrame: battleFrame || undefined,
    battleStyles: battleStyles.length > 0 ? battleStyles : undefined,
    battleCommands: battleCommands.length > 0 ? battleCommands : undefined,
  };
}
