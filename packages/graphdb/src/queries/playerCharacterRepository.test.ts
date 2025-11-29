import {
  parseToPlayerCharacterNodeList,
  parseToGraphDbBattleCommandList,
} from '@echo-500/schema';
import { generateUUID } from '@echo-500/utility';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { initializeDatabase, closeDatabase, executeQuery } from '../db';
import { graphDbSchemas } from '../schemas';
import { battleCommandGraphRepository } from './battleCommandRepository';
import { playerCharacterGraphRepository } from './playerCharacterRepository';

describe('playerCharacterGraphRepository', () => {
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
    // 各テスト後にPlayerCharacterとBattleCommandノードを全削除
    await executeQuery('MATCH (pc:PlayerCharacter) DETACH DELETE pc');
    await executeQuery('MATCH (bc:BattleCommand) DETACH DELETE bc');
  });

  describe('create', () => {
    it('PlayerCharacterノードを作成できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();

      // Act（実行）
      const result = await playerCharacterGraphRepository.create(characterId);

      // Assert（検証）
      const [pc] = parseToPlayerCharacterNodeList(result);
      expect(pc.id).toBe(characterId);
    });
  });

  describe('findById', () => {
    it('存在するIDでPlayerCharacterを取得できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      await playerCharacterGraphRepository.create(characterId);

      // Act（実行）
      const result = await playerCharacterGraphRepository.findById(characterId);

      // Assert（検証）
      const [pc] = parseToPlayerCharacterNodeList(result);
      expect(pc.id).toBe(characterId);
    });

    it('存在しないIDの場合、空配列を返す', async () => {
      // Arrange（準備）
      const nonExistentId = generateUUID();

      // Act（実行）
      const result =
        await playerCharacterGraphRepository.findById(nonExistentId);

      // Assert（検証）
      const parsed = parseToPlayerCharacterNodeList(result);
      expect(parsed).toEqual([]);
    });
  });

  describe('delete', () => {
    it('PlayerCharacterノードを削除できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      await playerCharacterGraphRepository.create(characterId);

      // 削除前に存在確認
      const beforeDelete =
        await playerCharacterGraphRepository.findById(characterId);
      const parsedBefore = parseToPlayerCharacterNodeList(beforeDelete);
      expect(parsedBefore).toHaveLength(1);

      // Act（実行）
      await playerCharacterGraphRepository.delete(characterId);

      // Assert（検証）
      const afterDelete =
        await playerCharacterGraphRepository.findById(characterId);
      const parsedAfter = parseToPlayerCharacterNodeList(afterDelete);
      expect(parsedAfter).toEqual([]);
    });
  });

  describe('getBattleCommands', () => {
    it('PlayerCharacterのバトルコマンドをsortOrder順で取得できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const command1Id = generateUUID();
      const command2Id = generateUUID();

      await playerCharacterGraphRepository.create(characterId);

      // コマンド1を作成
      await battleCommandGraphRepository.create({
        id: command1Id,
        class: '戦士',
        name: 'コマンド1',
        cp: 1,
        timing: 'メイン',
        cost: '1',
        range: '近接',
        effect: '効果1',
        target: '単体',
        flavor: 'フレーバー1',
        tags: ['攻撃'],
        details: '詳細1',
      });

      // コマンド2を作成
      await battleCommandGraphRepository.create({
        id: command2Id,
        class: '魔法使い',
        name: 'コマンド2',
        cp: 2,
        timing: 'リアクション',
        cost: '2',
        range: '遠隔',
        effect: '効果2',
        target: '全体',
        flavor: 'フレーバー2',
        tags: ['防御', '魔法'],
        details: '詳細2',
      });

      // sortOrder: command2 (0) -> command1 (1)
      await battleCommandGraphRepository.linkToCharacter(
        characterId,
        command2Id,
        0,
      );
      await battleCommandGraphRepository.linkToCharacter(
        characterId,
        command1Id,
        1,
      );

      // Act（実行）
      const result =
        await playerCharacterGraphRepository.getBattleCommands(characterId);

      // Assert（検証）
      const commands = parseToGraphDbBattleCommandList(result);
      expect(commands).toHaveLength(2);
      // sortOrder順で並んでいることを確認
      expect(commands[0].id).toBe(command2Id);
      expect(commands[0].name).toBe('コマンド2');
      expect(commands[0].sortOrder).toBe(0);
      expect(commands[1].id).toBe(command1Id);
      expect(commands[1].name).toBe('コマンド1');
      expect(commands[1].sortOrder).toBe(1);
    });
  });
});
