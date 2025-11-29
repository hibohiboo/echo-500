import { parseToCheckDuplicateBattleCommand } from '@echo-500/schema';
import { executeQuery } from '../db';
import { escapeCypherString } from '../utils/escapeCypherString';

interface CreateBattleCommandParams {
  id: string;
  class: string;
  name: string;
  cp: number;
  timing: string;
  cost: string;
  range: string;
  effect: string;
  target: string;
  flavor: string;
  tags: string[]; // JSON文字列として保存
  details: string;
}

/**
 * バトルコマンドのグラフDB操作リポジトリ
 */
export const battleCommandGraphRepository = {
  /**
   * BattleCommandノードを作成
   * tagsはJSON文字列として保存
   */
  async create(params: CreateBattleCommandParams) {
    const escapedClass = escapeCypherString(params.class);
    const escapedName = escapeCypherString(params.name);
    const escapedTiming = escapeCypherString(params.timing);
    const escapedCost = escapeCypherString(params.cost);
    const escapedRange = escapeCypherString(params.range);
    const escapedEffect = escapeCypherString(params.effect);
    const escapedTarget = escapeCypherString(params.target);
    const escapedFlavor = escapeCypherString(params.flavor);
    const escapedDetails = escapeCypherString(params.details);
    const escapedTags = escapeCypherString(JSON.stringify(params.tags));

    return executeQuery(`
      CREATE (bc:BattleCommand {
        id: '${params.id}',
        class: '${escapedClass}',
        name: '${escapedName}',
        cp: ${params.cp},
        timing: '${escapedTiming}',
        cost: '${escapedCost}',
        range: '${escapedRange}',
        effect: '${escapedEffect}',
        target: '${escapedTarget}',
        flavor: '${escapedFlavor}',
        tags: '${escapedTags}',
        details: '${escapedDetails}'
      })
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
        bc.details AS details
    `);
  },

  /**
   * 重複チェック：同じclass + nameのコマンドが既に存在するか確認
   */
  async checkDuplicate(
    characterId: string,
    className: string,
    commandName: string,
  ): Promise<boolean> {
    const escapedClass = escapeCypherString(className);
    const escapedName = escapeCypherString(commandName);

    const result = await executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${characterId}'})-[:HAS_BATTLE_COMMAND]->(bc:BattleCommand)
      WHERE bc.class = '${escapedClass}' AND bc.name = '${escapedName}'
      RETURN count(bc) AS count
    `);
    const parsed = parseToCheckDuplicateBattleCommand(result);
    return parsed.length > 0 && Number(parsed[0].count) > 0;
  },

  /**
   * PlayerCharacterとBattleCommandをHAS_BATTLE_COMMANDリレーションで接続
   */
  async linkToCharacter(
    characterId: string,
    commandId: string,
    sortOrder: number,
  ) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${characterId}'})
      MATCH (bc:BattleCommand {id: '${commandId}'})
      CREATE (pc)-[r:HAS_BATTLE_COMMAND {sortOrder: ${sortOrder}}]->(bc)
      RETURN r
    `);
  },

  /**
   * PlayerCharacterとBattleCommandのリレーションを削除
   */
  async unlinkFromCharacter(characterId: string, commandId: string) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_BATTLE_COMMAND]->(bc:BattleCommand {id: '${commandId}'})
      DELETE r
    `);
  },

  /**
   * バトルコマンドの並び順を更新
   */
  async updateSortOrder(
    characterId: string,
    commandId: string,
    sortOrder: number,
  ) {
    return executeQuery(`
      MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_BATTLE_COMMAND]->(bc:BattleCommand {id: '${commandId}'})
      SET r.sortOrder = ${sortOrder}
      RETURN r
    `);
  },

  /**
   * BattleCommandノードとそのリレーションを削除
   * 注意: このメソッドはBattleCommandノード自体を削除します
   */
  async delete(commandId: string) {
    return executeQuery(`
      MATCH (bc:BattleCommand {id: '${commandId}'})
      DETACH DELETE bc
    `);
  },
} as const;
