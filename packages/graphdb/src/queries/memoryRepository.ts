import { executeQuery } from '../db';
import { escapeCypherString } from '../utils/escapeCypherString';

interface CreateMemoryParams {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

/**
 * メモリーのグラフDB操作リポジトリ
 */
export const memoryGraphRepository = {
  /**
   * Memoryノードを作成
   * tagsはJSON文字列として保存
   */
  async create(params: CreateMemoryParams) {
    const escapedTitle = escapeCypherString(params.title);
    const escapedDescription = escapeCypherString(params.description);
    const escapedTags = escapeCypherString(JSON.stringify(params.tags));

    return executeQuery(`
      CREATE (m:Memory {
        id: '${params.id}',
        title: '${escapedTitle}',
        description: '${escapedDescription}',
        tags: '${escapedTags}'
      })
      RETURN
        m.id AS id,
        m.title AS title,
        m.description AS description,
        m.tags AS tags
    `);
  },

  /**
   * PlayerCharacterとMemoryをHAS_MEMORYリレーションで接続
   */
  async linkToCharacter(
    characterId: string,
    memoryId: string,
    sortOrder: number,
  ) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${characterId}'})
      MATCH (m:Memory {id: '${memoryId}'})
      CREATE (pc)-[r:HAS_MEMORY {sortOrder: ${sortOrder}}]->(m)
      RETURN r
    `);
  },

  /**
   * PlayerCharacterとMemoryのリレーションを削除
   */
  async unlinkFromCharacter(characterId: string, memoryId: string) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_MEMORY]->(m:Memory {id: '${memoryId}'})
      DELETE r
    `);
  },

  /**
   * メモリーの並び順を更新
   */
  async updateSortOrder(
    characterId: string,
    memoryId: string,
    sortOrder: number,
  ) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_MEMORY]->(m:Memory {id: '${memoryId}'})
      SET r.sortOrder = ${sortOrder}
      RETURN r
    `);
  },

  /**
   * Memoryノードを更新
   */
  async update(params: CreateMemoryParams) {
    const escapedTitle = escapeCypherString(params.title);
    const escapedDescription = escapeCypherString(params.description);
    const escapedTags = escapeCypherString(JSON.stringify(params.tags));

    return executeQuery(`
      MATCH (m:Memory {id: '${params.id}'})
      SET m.title = '${escapedTitle}', m.description = '${escapedDescription}', m.tags = '${escapedTags}'
      RETURN
        m.id AS id,
        m.title AS title,
        m.description AS description,
        m.tags AS tags
    `);
  },

  /**
   * Memoryノードとそのリレーションを削除
   */
  async delete(memoryId: string) {
    return executeQuery(`
      MATCH (m:Memory {id: '${memoryId}'})
      DETACH DELETE m
    `);
  },
} as const;
