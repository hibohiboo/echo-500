import type {
  BattleCommandFormData,
  GraphDbBattleCommandNode,
} from '@echo-500/schema';

const API_BASE_URL = '/api';

/**
 * バトルコマンドのGraphDB API（Cloudflare Workers経由）
 */
export const battleCommandGraphApi = {
  /**
   * BattleCommandノードを作成
   */
  async create(data: BattleCommandFormData & { id: string }): Promise<GraphDbBattleCommandNode> {
    const response = await fetch(`${API_BASE_URL}/graph/battle-commands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create battle command node');
    }
    return response.json();
  },

  /**
   * PlayerCharacterとBattleCommandをリンク
   */
  async linkToCharacter(
    characterId: string,
    commandId: string,
    sortOrder: number,
  ): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/graph/player-characters/${characterId}/battle-commands/${commandId}/link`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder }),
      },
    );
    if (!response.ok) {
      throw new Error('Failed to link battle command');
    }
  },

  /**
   * PlayerCharacterとBattleCommandのリンクを解除
   */
  async unlinkFromCharacter(
    characterId: string,
    commandId: string,
  ): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/graph/player-characters/${characterId}/battle-commands/${commandId}/link`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Failed to unlink battle command');
    }
  },

  /**
   * バトルコマンドの並び順を更新
   */
  async updateSortOrder(
    characterId: string,
    commandId: string,
    sortOrder: number,
  ): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/graph/player-characters/${characterId}/battle-commands/${commandId}/sort-order`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder }),
      },
    );
    if (!response.ok) {
      throw new Error('Failed to update sort order');
    }
  },

  /**
   * BattleCommandノードを削除
   */
  async delete(commandId: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/graph/battle-commands/${commandId}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Failed to delete battle command node');
    }
  },

  /**
   * 重複チェック：同じclass + nameのコマンドが既に存在するか確認
   */
  async checkDuplicate(
    characterId: string,
    className: string,
    commandName: string,
  ): Promise<boolean> {
    const response = await fetch(
      `${API_BASE_URL}/graph/player-characters/${characterId}/battle-commands/check-duplicate?class=${encodeURIComponent(className)}&name=${encodeURIComponent(commandName)}`,
    );
    if (!response.ok) {
      throw new Error('Failed to check duplicate');
    }
    const result = await response.json();
    return result.isDuplicate;
  },
};
