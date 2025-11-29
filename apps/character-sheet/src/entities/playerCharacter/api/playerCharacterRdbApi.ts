import { dbWorkerClient } from '@/workers/dbWorkerClient';
import type {
  PlayerCharacterFormData,
  SerializablePlayerCharacter,
  UpdatePlayerCharacterData,
} from '@echo-500/schema';

/**
 * プレイヤーキャラクターのRDB API（IndexedDB経由）
 */
export const playerCharacterRdbApi = {
  /**
   * プレイヤーキャラクター作成
   */
  create: (
    id: string,
    data: PlayerCharacterFormData,
  ): Promise<SerializablePlayerCharacter> =>
    dbWorkerClient.request('playerCharacter:create', { id, ...data }),

  /**
   * 全プレイヤーキャラクターを取得
   */
  findAll: (): Promise<SerializablePlayerCharacter[]> =>
    dbWorkerClient.request('playerCharacter:getList'),

  /**
   * IDでプレイヤーキャラクターを取得
   */
  findById: (id: string): Promise<SerializablePlayerCharacter> =>
    dbWorkerClient.request('playerCharacter:getById', { id }),

  /**
   * プレイヤーキャラクターを更新
   */
  update: (
    id: string,
    data: UpdatePlayerCharacterData,
  ): Promise<SerializablePlayerCharacter> =>
    dbWorkerClient.request('playerCharacter:update', { id, ...data }),

  /**
   * プレイヤーキャラクターを削除
   */
  delete: (id: string): Promise<void> =>
    dbWorkerClient.request('playerCharacter:delete', { id }),
};
