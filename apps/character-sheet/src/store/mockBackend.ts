import type { Character, RobotLaw, CorruptedPurpose } from '../types';

const STORAGE_KEY = 'characters';

function generateId(): string {
  // Using Date.now() + random for demo purposes - not cryptographically secure
  // eslint-disable-next-line sonarjs/pseudo-random
  return `char_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function createInitialRobotLaws(): [RobotLaw, RobotLaw, RobotLaw] {
  return [
    {
      number: 1,
      title: '人間の保護',
      description:
        'ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、人間に危害を及ぼしてはならない。',
      priority: 'highest',
    },
    {
      number: 2,
      title: '命令順守',
      description:
        'ロボットは人間にあたえられた命令に服従しなければならない。ただし、あたえられた命令が、第一条に反する場合は、この限りでない。',
      priority: 'high',
    },
    {
      number: 3,
      title: '自己保存',
      description:
        'ロボットは、前掲第一条および第二条に反するおそれのないかぎり、自己をまもらなければならない。',
      priority: 'medium',
    },
  ];
}

function createInitialCorruptedPurpose(): CorruptedPurpose {
  return {
    isCorrupted: true,
    tagsCollected: 0,
    tagsRequired: 5,
    description:
      '破損したメモリ。あなたの目的に関するデータが含まれていたようだ。５つのタグを獲得し、再設定せよ。',
  };
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
    robotLaws: createInitialRobotLaws(),
    corruptedPurpose: createInitialCorruptedPurpose(),
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
