import type {
  PlayerCharacterFormData,
  SerializablePlayerCharacter,
  UpdatePlayerCharacterData,
} from '@echo-500/schema';

const API_BASE_URL = '/api';

/**
 * プレイヤーキャラクターのRDB API（Cloudflare Workers経由）
 */
export const playerCharacterRdbApi = {
  /**
   * プレイヤーキャラクター作成
   */
  async create(
    data: PlayerCharacterFormData,
  ): Promise<SerializablePlayerCharacter> {
    const response = await fetch(`${API_BASE_URL}/player-characters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create player character');
    }
    return response.json();
  },

  /**
   * 全プレイヤーキャラクターを取得
   */
  async findAll(): Promise<SerializablePlayerCharacter[]> {
    const response = await fetch(`${API_BASE_URL}/player-characters`);
    if (!response.ok) {
      throw new Error('Failed to fetch player characters');
    }
    return response.json();
  },

  /**
   * IDでプレイヤーキャラクターを取得
   */
  async findById(id: string): Promise<SerializablePlayerCharacter | null> {
    const response = await fetch(`${API_BASE_URL}/player-characters/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch player character');
    }
    return response.json();
  },

  /**
   * プレイヤーキャラクターを更新
   */
  async update(
    id: string,
    data: UpdatePlayerCharacterData,
  ): Promise<SerializablePlayerCharacter> {
    const response = await fetch(`${API_BASE_URL}/player-characters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update player character');
    }
    return response.json();
  },

  /**
   * プレイヤーキャラクターを削除
   */
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/player-characters/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete player character');
    }
  },
};
