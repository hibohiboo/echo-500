import { eq, desc } from 'drizzle-orm';
import { playerCharactersTable, type NewPlayerCharacter } from '../schema';
import type {
  PlayerCharacter,
  UpdatePlayerCharacterData,
} from '@echo-500/schema';
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
  async create(data: NewPlayerCharacter): Promise<PlayerCharacter> {
    const [result] = await database
      .insert(playerCharactersTable)
      .values(data)
      .returning();
    return result;
  },

  /**
   * 全プレイヤーキャラクターを取得（更新日時の降順）
   */
  async findAll(): Promise<PlayerCharacter[]> {
    return database
      .select({
        id: playerCharactersTable.id,
        name: playerCharactersTable.name,
        createdAt: playerCharactersTable.createdAt,
        updatedAt: playerCharactersTable.updatedAt,
      })
      .from(playerCharactersTable)
      .orderBy(desc(playerCharactersTable.updatedAt));
  },

  /**
   * IDでプレイヤーキャラクターを取得
   */
  async findById(id: string): Promise<PlayerCharacter> {
    const [result] = await database
      .select()
      .from(playerCharactersTable)
      .where(eq(playerCharactersTable.id, id));
    return result ?? null;
  },

  /**
   * プレイヤーキャラクターを更新
   */
  async update(
    id: string,
    data: UpdatePlayerCharacterData,
  ): Promise<PlayerCharacter> {
    const [result] = await database
      .update(playerCharactersTable)
      .set({ name: data.name, updatedAt: new Date() })
      .where(eq(playerCharactersTable.id, id))
      .returning();
    return result;
  },

  /**
   * プレイヤーキャラクターを削除
   */
  async delete(id: string) {
    await database
      .delete(playerCharactersTable)
      .where(eq(playerCharactersTable.id, id));
  },
});
