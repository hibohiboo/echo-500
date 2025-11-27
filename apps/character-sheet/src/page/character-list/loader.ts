import { getCharacters } from '@/entities/character';

export const characterListLoader = async () => {
  const characters = getCharacters();
  return characters;
};
