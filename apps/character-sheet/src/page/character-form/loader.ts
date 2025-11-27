import { getCharacter } from '@/entities/character';
import type { LoaderFunctionArgs } from 'react-router';

export const characterFormLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    return null;
  }

  const character = getCharacter(id);

  if (!character) {
    throw new Error('キャラクターが見つかりません');
  }

  return character;
};
