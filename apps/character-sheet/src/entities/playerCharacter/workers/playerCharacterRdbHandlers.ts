import { playerCharacterRepository } from '@echo-500/rdb';
import {
  parsePlayerCharacterFormData,
  parseUpdatePlayerCharacterData,
  parsePlayerCharacterId,
  parsePlayerCharacterList,
  parsePlayerCharacter,
} from '@echo-500/schema';

// ===== プレイヤーキャラクター RDB操作ハンドラー =====
export const playerCharacterRdbHandlers = [
  {
    type: 'playerCharacter:getList',
    handler: async () => {
      const characters = await playerCharacterRepository.findAll();
      const data = parsePlayerCharacterList(characters);
      return { data };
    },
  },
  {
    type: 'playerCharacter:getById',
    handler: async (payload: unknown) => {
      const { id } = parsePlayerCharacterId(payload);
      const character = await playerCharacterRepository.findById(id);
      if (!character) {
        throw new Error(`Player character not found: ${id}`);
      }
      const data = parsePlayerCharacter(character);
      return { data };
    },
  },
  {
    type: 'playerCharacter:create',
    handler: async (payload: unknown) => {
      const { name } = parsePlayerCharacterFormData(payload);
      const newCharacter = await playerCharacterRepository.create({ name });
      const data = parsePlayerCharacter(newCharacter);
      return { data };
    },
  },
  {
    type: 'playerCharacter:update',
    handler: async (payload: unknown) => {
      const { id, name } = parseUpdatePlayerCharacterData(payload);
      const updatedCharacter = await playerCharacterRepository.update(id, {
        name,
      });
      const data = parsePlayerCharacter(updatedCharacter);
      return { data };
    },
  },
  {
    type: 'playerCharacter:delete',
    handler: async (payload: unknown) => {
      const { id } = parsePlayerCharacterId(payload);
      await playerCharacterRepository.delete(id);
      return { success: true };
    },
  },
] as const;
type PlayerCharacterRdbHandler = (typeof playerCharacterRdbHandlers)[number];

export type PlayerCharacterRdbHandlerMap = {
  [H in PlayerCharacterRdbHandler as H['type']]: ReturnType<
    H['handler']
  > extends Promise<{
    data: infer D;
  }>
    ? D
    : ReturnType<H['handler']> extends Promise<{ success: boolean }>
      ? void
      : never;
};
