import type { Character } from '../types';

const STORAGE_KEY = 'characters';

function generateId(): string {
  return `char_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

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

export function createCharacter(name: string): Character {
  const characters = getStoredCharacters();
  const newCharacter: Character = {
    id: generateId(),
    name,
  };
  characters.push(newCharacter);
  setStoredCharacters(characters);
  return newCharacter;
}

export function updateCharacter(id: string, name: string): Character | null {
  const characters = getStoredCharacters();
  const index = characters.findIndex((char) => char.id === id);
  if (index === -1) {
    return null;
  }
  characters[index].name = name;
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
