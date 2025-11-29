import { battleCommandGraphRepository } from '@echo-500/graphdb';
import {
  parseBattleCommandFormData,
  parseBattleCommandId,
  parseCheckDuplicateBattleCommandPayload,
  parseLinkBattleCommandPayload,
  parseUpdateSortOrderPayload,
  parseToGraphDbBattleCommandNodeList,
} from '@echo-500/schema';
import { generateUUID } from '@echo-500/utility';

// ===== バトルコマンド GraphDB操作ハンドラー =====
export const battleCommandGraphHandlers = [
  {
    type: 'battleCommand:create',
    handler: async (payload: unknown) => {
      const data = parseBattleCommandFormData(payload);
      const id = generateUUID();
      const result = await battleCommandGraphRepository.create({ id, ...data });
      const commands = parseToGraphDbBattleCommandNodeList([result]);
      return { data: commands[0] };
    },
  },
  {
    type: 'battleCommand:checkDuplicate',
    handler: async (payload: unknown) => {
      const { characterId, className, commandName } =
        parseCheckDuplicateBattleCommandPayload(payload);
      const isDuplicate = await battleCommandGraphRepository.checkDuplicate(
        characterId,
        className,
        commandName,
      );
      return { data: isDuplicate };
    },
  },
  {
    type: 'battleCommand:linkToCharacter',
    handler: async (payload: unknown) => {
      const { characterId, commandId, sortOrder } =
        parseLinkBattleCommandPayload(payload);
      await battleCommandGraphRepository.linkToCharacter(
        characterId,
        commandId,
        sortOrder,
      );
      return { success: true };
    },
  },
  {
    type: 'battleCommand:unlinkFromCharacter',
    handler: async (payload: unknown) => {
      const { characterId, commandId } = parseLinkBattleCommandPayload(payload);
      await battleCommandGraphRepository.unlinkFromCharacter(
        characterId,
        commandId,
      );
      return { success: true };
    },
  },
  {
    type: 'battleCommand:updateSortOrder',
    handler: async (payload: unknown) => {
      const { characterId, commandId, sortOrder } =
        parseUpdateSortOrderPayload(payload);
      await battleCommandGraphRepository.updateSortOrder(
        characterId,
        commandId,
        sortOrder,
      );
      return { success: true };
    },
  },
  {
    type: 'battleCommand:delete',
    handler: async (payload: unknown) => {
      const { id } = parseBattleCommandId(payload);
      await battleCommandGraphRepository.delete(id);
      return { success: true };
    },
  },
] as const;
type BattleCommandGraphHandler = (typeof battleCommandGraphHandlers)[number];

export type BattleCommandGraphHandlerMap = {
  [H in BattleCommandGraphHandler as H['type']]: ReturnType<
    H['handler']
  > extends Promise<{
    data: infer D;
  }>
    ? D
    : ReturnType<H['handler']> extends Promise<{ success: boolean }>
      ? void
      : never;
};
