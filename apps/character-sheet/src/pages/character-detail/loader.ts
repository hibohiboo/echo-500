import type { Character } from '@/entities/character';
import {
  fetchPlayerCharacterBattleCommands,
  fetchPlayerCharacterById,
} from '@/entities/playerCharacter';
import { fetchPlayerCharacterMemories } from '@/entities/playerCharacter/actions/playerCharacterMemoryActions';
import type { LoaderFunctionArgs } from 'react-router';

export const createCharacterDetailLoader =
  (dispatch: AppDispatch) =>
  async ({ params }: LoaderFunctionArgs): Promise<Character> => {
    const { id } = params;

    if (!id) {
      throw new Error('キャラクターIDが指定されていません');
    }

    const character = await dispatch(fetchPlayerCharacterById(id));

    if (!character) {
      throw new Error('キャラクターが見つかりません');
    }
    const [battleCommands, memorySlots] = await Promise.all([
      fetchPlayerCharacterBattleCommands(id),
      fetchPlayerCharacterMemories(id),
    ]);
    return {
      ...character,
      memorySlots,
      battleCommands: battleCommands.map((b) => b.name),
    };
  };
