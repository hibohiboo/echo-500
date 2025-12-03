import {
  fetchPlayerCharacterBattleCommands,
  fetchPlayerCharacterById,
} from '@/entities/playerCharacter';
import { fetchPlayerCharacterMemories } from '@/entities/playerCharacter/actions/playerCharacterMemoryActions';
import type {
  SerializablePlayerCharacter,
  PlayerCharacterMemory,
  PlayerCharacterBattleCommand,
} from '@echo-500/schema';
import type { LoaderFunctionArgs } from 'react-router';

export type CharacterDetailData = SerializablePlayerCharacter & {
  memorySlots: PlayerCharacterMemory[];
  battleCommands: PlayerCharacterBattleCommand[];
};

export const createCharacterDetailLoader =
  (dispatch: AppDispatch) =>
  async ({ params }: LoaderFunctionArgs): Promise<CharacterDetailData> => {
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
      battleCommands,
    };
  };
