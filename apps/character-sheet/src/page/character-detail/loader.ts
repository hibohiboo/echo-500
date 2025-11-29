import { getCharacter } from '@/entities/character';
import type { LoaderFunctionArgs } from 'react-router';

export const characterDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    throw new Error('キャラクターIDが指定されていません');
  }

  const character = getCharacter(id);

  if (!character) {
    throw new Error('キャラクターが見つかりません');
  }

  return character;
};
