import { playerCharactersTable, type NewPlayerCharacter } from '../schema';
import type { PgliteDatabase } from 'drizzle-orm/pglite';

/**
 * プレイヤーキャラクターのデータアクセス層（DI対応）
 */
export const createPlayerCharacterRepository = (
  database: PgliteDatabase<Record<string, unknown>>,
) => ({
  /**
   * プレイヤーキャラクターを作成
   */
  async create(data: NewPlayerCharacter) {
    const [result] = await database
      .insert(playerCharactersTable)
      .values(data)
      .returning();
    return result;
  },
});
