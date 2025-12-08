import { generateId, createInitialMemorySlots } from '../lib/defaults';
import type { Character } from '../model/types';

const STORAGE_KEY = 'characters';

function getStoredCharacters(): Character[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function setStoredCharacters(characters: Character[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

export function getCharacters(): Character[] {
  return getStoredCharacters();
}

export function getCharacter(id: string): Character | undefined {
  const characters = getStoredCharacters();
  return characters.find((char) => char.id === id);
}

export function createCharacter(
  characterData: Omit<Character, 'id'>,
): Character {
  const characters = getStoredCharacters();
  const newCharacter: Character = {
    id: generateId(),
    ...characterData,
  };
  characters.push(newCharacter);
  setStoredCharacters(characters);
  return newCharacter;
}

// Legacy function for backward compatibility
export function createCharacterWithDefaults(name: string): Character {
  return createCharacter({
    name,
    memorySlots: createInitialMemorySlots(),
  });
}

export function updateCharacter(
  id: string,
  updatedCharacter: Omit<Character, 'id'>,
): Character | null {
  const characters = getStoredCharacters();
  const index = characters.findIndex((char) => char.id === id);
  if (index === -1) {
    return null;
  }
  characters[index] = { ...updatedCharacter, id };
  setStoredCharacters(characters);
  return characters[index];
}

export function deleteCharacter(id: string): boolean {
  const characters = getStoredCharacters();
  const filteredCharacters = characters.filter((char) => char.id !== id);
  if (filteredCharacters.length === characters.length) {
    return false;
  }
  setStoredCharacters(filteredCharacters);
  return true;
}
