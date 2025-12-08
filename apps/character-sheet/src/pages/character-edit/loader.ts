import type { Character } from '@/entities/character';
import {
  fetchPlayerCharacterBattleCommands,
  fetchPlayerCharacterById,
} from '@/entities/playerCharacter';
import { fetchPlayerCharacterMemories } from '@/entities/playerCharacter/actions/playerCharacterMemoryActions';
import {
  setCharacterId,
  setName,
  setMemorySlots,
  setSelectedBattleCommands,
} from './model/characterEditSlice';
import type { LoaderFunctionArgs } from 'react-router';

export const createCharacterEditLoader =
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

    // Redux stateを初期化
    dispatch(setCharacterId(id));
    dispatch(setName(character.name));
    dispatch(setMemorySlots(memorySlots));
    dispatch(setSelectedBattleCommands(battleCommands));

    return {
      ...character,
      memorySlots: memorySlots.map((m) => ({
        title: m.title,
        description: m.description,
        tags: m.tags,
      })),
      battleCommands: battleCommands.map((b) => b.name),
    };
  };
