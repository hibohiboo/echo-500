import type { PlayerCharacterBattleCommand } from '@echo-500/schema';

const API_BASE_URL = '/api';

/**
 * プレイヤーキャラクターのGraphDB API（Cloudflare Workers経由）
 */
export const playerCharacterGraphApi = {
  /**
   * PlayerCharacterノードを作成
   */
  async create(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/graph/player-characters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error('Failed to create player character node');
    }
  },

  /**
   * PlayerCharacterノードを削除
   */
  async delete(id: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/graph/player-characters/${id}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Failed to delete player character node');
    }
  },

  /**
   * PlayerCharacterのバトルコマンドを取得（sortOrder順）
   */
  async getBattleCommands(
    characterId: string,
  ): Promise<PlayerCharacterBattleCommand[]> {
    const response = await fetch(
      `${API_BASE_URL}/graph/player-characters/${characterId}/battle-commands`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch battle commands');
    }
    return response.json();
  },
};
