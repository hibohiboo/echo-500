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
});
