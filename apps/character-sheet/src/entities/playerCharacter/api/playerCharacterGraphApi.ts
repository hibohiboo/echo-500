import { dbWorkerClient } from '@/workers/dbWorkerClient';
import type {
  PlayerCharacterBattleCommand,
  PlayerCharacterMemory,
} from '@echo-500/schema';

/**
 * プレイヤーキャラクターのGraphDB API（IndexedDB経由）
 */
export const playerCharacterGraphApi = {
  /**
   * PlayerCharacterノードを作成
   */
  create: (id: string): Promise<void> =>
    dbWorkerClient.request('playerCharacter:createNode', { id }),

  /**
   * PlayerCharacterノードを削除
   */
  delete: (id: string): Promise<void> =>
    dbWorkerClient.request('playerCharacter:deleteNode', { id }),

  /**
   * PlayerCharacterのバトルコマンドを取得（sortOrder順）
   */
  getBattleCommands: (
    characterId: string,
  ): Promise<PlayerCharacterBattleCommand[]> =>
    dbWorkerClient.request('playerCharacter:getBattleCommands', {
      id: characterId,
    }),

  /**
   * PlayerCharacterのメモリーを取得（sortOrder順）
   */
  getMemories: (characterId: string): Promise<PlayerCharacterMemory[]> =>
    dbWorkerClient.request('playerCharacter:getMemories', { id: characterId }),
};
