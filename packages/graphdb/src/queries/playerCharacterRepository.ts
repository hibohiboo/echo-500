import { executeQuery } from '../db';

/**
 * プレイヤーキャラクターのグラフDB操作リポジトリ
 * PlayerCharacterノードはRDBのIDのみを保持し、バトルコマンドとの関連を管理
 */
export const playerCharacterGraphRepository = {
  /**
   * PlayerCharacterノードを作成
   */
  async create(id: string) {
    return executeQuery(`
      CREATE (pc:PlayerCharacter {id: '${id}'})
      RETURN pc.id AS id
    `);
  },

  /**
   * PlayerCharacterノードを削除
   * バトルコマンドとのリレーションも一緒に削除される（DETACH DELETE）
   */
  async delete(id: string) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${id}'})
      DETACH DELETE pc
    `);
  },

  /**
   * IDでPlayerCharacterを取得
   */
  async findById(id: string) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${id}'})
      RETURN pc.id AS id
    `);
  },

  /**
   * PlayerCharacterのバトルコマンドを取得（sortOrder順）
   */
  async getBattleCommands(characterId: string) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_BATTLE_COMMAND]->(bc:BattleCommand)
      RETURN
        bc.id AS id,
        bc.class AS class,
        bc.name AS name,
        bc.cp AS cp,
        bc.timing AS timing,
        bc.cost AS cost,
        bc.range AS range,
        bc.effect AS effect,
        bc.target AS target,
        bc.flavor AS flavor,
        bc.tags AS tags,
        bc.details AS details,
        r.sortOrder AS sortOrder
      ORDER BY r.sortOrder
    `);
  },
} as const;
