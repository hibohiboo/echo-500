import type { Character, MemorySlot } from '../types';

const STORAGE_KEY = 'characters';

function generateId(): string {
  // Using Date.now() + random for demo purposes - not cryptographically secure
  // eslint-disable-next-line sonarjs/pseudo-random
  return `char_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function createInitialMemorySlots(): MemorySlot[] {
  return [
    {
      title: '人間の保護',
      description:
        'ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、人間に危害を及ぼしてはならない。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：最高'],
    },
    {
      title: '命令順守',
      description:
        'ロボットは人間にあたえられた命令に服従しなければならない。ただし、あたえられた命令が、第一条に反する場合は、この限りでない。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：高'],
    },
    {
      title: '自己保存',
      description:
        'ロボットは、前掲第一条および第二条に反するおそれのないかぎり、自己をまもらなければならない。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：中'],
    },
    {
      title: '破損したメモリ',
      description:
        'あなたの目的に関するデータが含まれていたようだ。記憶を再構築せよ。',
      tags: ['破損データ', '要復旧', 'クリティカル'],
    },
  ];
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
