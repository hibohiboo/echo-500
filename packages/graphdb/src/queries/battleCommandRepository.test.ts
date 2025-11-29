import { parseToGraphDbBattleCommandNodeList } from '@echo-500/schema';
import { generateUUID } from '@echo-500/utility';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { initializeDatabase, closeDatabase, executeQuery } from '../db';
import { graphDbSchemas } from '../schemas';
import { battleCommandGraphRepository } from './battleCommandRepository';

describe('battleCommandGraphRepository', () => {
  beforeAll(async () => {
    await initializeDatabase();
    const { nodes, relationships } = graphDbSchemas;
    const schemas = [...nodes, ...relationships];
    await Promise.all(schemas.map((schema) => executeQuery(schema.query)));
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    // 各テスト後にBattleCommandノードを全削除
    await executeQuery('MATCH (bc:BattleCommand) DETACH DELETE bc');
  });

  describe('create', () => {
    it('BattleCommandノードを作成できる', async () => {
      // Arrange（準備）
      const commandId = generateUUID();
      const commandData = {
        id: commandId,
        class: '戦士',
        name: 'テストコマンド',
        cp: 1,
        timing: 'メイン',
        cost: '1',
        range: '近接',
        effect: 'テスト効果',
        target: '単体',
        flavor: 'テストフレーバー',
        tags: ['攻撃', '物理'],
        details: 'テスト詳細',
      };

      // Act（実行）
      const result = await battleCommandGraphRepository.create(commandData);

      // Assert（検証）
      const commands = parseToGraphDbBattleCommandNodeList(result);
      expect(commands).toHaveLength(1);
      expect(commands[0].id).toBe(commandId);
      expect(commands[0].class).toBe('戦士');
      expect(commands[0].name).toBe('テストコマンド');
      expect(commands[0].tags).toEqual(['攻撃', '物理']);
    });
  });

  describe('checkDuplicate', () => {
    it('同じclass+nameのコマンドが存在する場合、trueを返す', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const commandId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // BattleCommand作成
      await battleCommandGraphRepository.create({
        id: commandId,
        class: '戦士',
        name: '既存コマンド',
        cp: 1,
        timing: 'メイン',
        cost: '1',
        range: '近接',
        effect: '効果',
        target: '単体',
        flavor: 'フレーバー',
        tags: ['攻撃'],
        details: '詳細',
      });

      // リレーション作成
      await battleCommandGraphRepository.linkToCharacter(
        characterId,
        commandId,
        0,
      );

      // Act（実行）
      const result = await battleCommandGraphRepository.checkDuplicate(
        characterId,
        '戦士',
        '既存コマンド',
      );

      // Assert（検証）
      expect(result).toBe(true);
    });

    it('同じclass+nameのコマンドが存在しない場合、falseを返す', async () => {
      // Arrange（準備）
      const characterId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // Act（実行）
      const result = await battleCommandGraphRepository.checkDuplicate(
        characterId,
        '魔法使い',
        '存在しないコマンド',
      );

      // Assert（検証）
      expect(result).toBe(false);
    });
  });

  describe('linkToCharacter', () => {
    it('PlayerCharacterとBattleCommandをリレーションで接続できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const commandId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // BattleCommand作成
      await battleCommandGraphRepository.create({
        id: commandId,
        class: '戦士',
        name: 'テストコマンド',
        cp: 1,
        timing: 'メイン',
        cost: '1',
        range: '近接',
        effect: '効果',
        target: '単体',
        flavor: 'フレーバー',
        tags: ['攻撃'],
        details: '詳細',
      });

      // Act（実行）
      await battleCommandGraphRepository.linkToCharacter(
        characterId,
        commandId,
        5,
      );

      // Assert（検証）
      const result = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_BATTLE_COMMAND]->(bc:BattleCommand {id: '${commandId}'})
        RETURN r.sortOrder AS sortOrder
      `);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect((result as { sortOrder: number }[])[0].sortOrder).toBe(5);
    });
  });

  describe('unlinkFromCharacter', () => {
    it('PlayerCharacterとBattleCommandのリレーションを削除できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const commandId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // BattleCommand作成
      await battleCommandGraphRepository.create({
        id: commandId,
        class: '戦士',
        name: 'テストコマンド',
        cp: 1,
        timing: 'メイン',
        cost: '1',
        range: '近接',
        effect: '効果',
        target: '単体',
        flavor: 'フレーバー',
        tags: ['攻撃'],
        details: '詳細',
      });

      // リレーション作成
      await battleCommandGraphRepository.linkToCharacter(
        characterId,
        commandId,
        0,
      );

      // 削除前にリレーション存在確認
      const beforeDelete = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_BATTLE_COMMAND]->(bc:BattleCommand {id: '${commandId}'})
        RETURN r
      `);
      expect(Array.isArray(beforeDelete)).toBe(true);
      expect(beforeDelete).toHaveLength(1);

      // Act（実行）
      await battleCommandGraphRepository.unlinkFromCharacter(
        characterId,
        commandId,
      );

      // Assert（検証）
      const afterDelete = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_BATTLE_COMMAND]->(bc:BattleCommand {id: '${commandId}'})
        RETURN r
      `);
      expect(Array.isArray(afterDelete)).toBe(true);
      expect(afterDelete).toHaveLength(0);
    });
  });

  describe('updateSortOrder', () => {
    it('バトルコマンドの並び順を更新できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const commandId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // BattleCommand作成
      await battleCommandGraphRepository.create({
        id: commandId,
        class: '戦士',
        name: 'テストコマンド',
        cp: 1,
        timing: 'メイン',
        cost: '1',
        range: '近接',
        effect: '効果',
        target: '単体',
        flavor: 'フレーバー',
        tags: ['攻撃'],
        details: '詳細',
      });

      // リレーション作成（sortOrder: 0）
      await battleCommandGraphRepository.linkToCharacter(
        characterId,
        commandId,
        0,
      );

      // Act（実行）sortOrderを10に更新
      await battleCommandGraphRepository.updateSortOrder(
        characterId,
        commandId,
        10,
      );

      // Assert（検証）
      const result = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_BATTLE_COMMAND]->(bc:BattleCommand {id: '${commandId}'})
        RETURN r.sortOrder AS sortOrder
      `);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect((result as { sortOrder: number }[])[0].sortOrder).toBe(10);
    });
  });

  describe('delete', () => {
    it('BattleCommandノードとそのリレーションを削除できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const commandId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // BattleCommand作成
      await battleCommandGraphRepository.create({
        id: commandId,
        class: '戦士',
        name: 'テストコマンド',
        cp: 1,
        timing: 'メイン',
        cost: '1',
        range: '近接',
        effect: '効果',
        target: '単体',
        flavor: 'フレーバー',
        tags: ['攻撃'],
        details: '詳細',
      });

      // リレーション作成
      await battleCommandGraphRepository.linkToCharacter(
        characterId,
        commandId,
        0,
      );

      // 削除前に存在確認
      const beforeDelete = await executeQuery(`
        MATCH (bc:BattleCommand {id: '${commandId}'})
        RETURN bc.id AS id
      `);
      expect(Array.isArray(beforeDelete)).toBe(true);
      expect(beforeDelete).toHaveLength(1);

      // Act（実行）
      await battleCommandGraphRepository.delete(commandId);

      // Assert（検証）
      const afterDelete = await executeQuery(`
        MATCH (bc:BattleCommand {id: '${commandId}'})
        RETURN bc.id AS id
      `);
      expect(Array.isArray(afterDelete)).toBe(true);
      expect(afterDelete).toHaveLength(0);

      // リレーションも削除されていることを確認
      const relationCheck = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_BATTLE_COMMAND]->(bc:BattleCommand {id: '${commandId}'})
        RETURN r
      `);
      expect(Array.isArray(relationCheck)).toBe(true);
      expect(relationCheck).toHaveLength(0);
    });
  });
});
