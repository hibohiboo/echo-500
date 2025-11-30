import { playerCharacterGraphRepository } from '@echo-500/graphdb';
import {
  parsePlayerCharacterId,
  parseToGraphDbBattleCommandList,
} from '@echo-500/schema';

// ===== プレイヤーキャラクター GraphDB操作ハンドラー =====
export const playerCharacterGraphHandlers = [
  {
    type: 'playerCharacter:createNode',
    handler: async (payload: unknown) => {
      const { id } = parsePlayerCharacterId(payload);
      await playerCharacterGraphRepository.create(id);
      return { success: true };
    },
  },
  {
    type: 'playerCharacter:deleteNode',
    handler: async (payload: unknown) => {
      const { id } = parsePlayerCharacterId(payload);
      await playerCharacterGraphRepository.delete(id);
      return { success: true };
    },
  },
  {
    type: 'playerCharacter:getBattleCommands',
    handler: async (payload: unknown) => {
      const { id } = parsePlayerCharacterId(payload);
      const result = await playerCharacterGraphRepository.getBattleCommands(id);
      console.log('resulet', result);
      const data = parseToGraphDbBattleCommandList(result);
      return { data };
    },
  },
] as const;
type PlayerCharacterGraphHandler =
  (typeof playerCharacterGraphHandlers)[number];

export type PlayerCharacterGraphHandlerMap = {
  [H in PlayerCharacterGraphHandler as H['type']]: ReturnType<
    H['handler']
  > extends Promise<{
    data: infer D;
  }>
    ? D
    : ReturnType<H['handler']> extends Promise<{ success: boolean }>
      ? void
      : never;
};
