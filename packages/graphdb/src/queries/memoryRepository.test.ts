import { parseToGraphDbMemoryNodeList } from '@echo-500/schema';
import { generateUUID } from '@echo-500/utility';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { initializeDatabase, closeDatabase, executeQuery } from '../db';
import { graphDbSchemas } from '../schemas';
import { memoryGraphRepository } from './memoryRepository';

describe('memoryGraphRepository', () => {
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
    // 各テスト後にMemoryノードを全削除
    await executeQuery('MATCH (m:Memory) DETACH DELETE m');
  });

  describe('create', () => {
    it('Memoryノードを作成できる', async () => {
      // Arrange（準備）
      const memoryId = generateUUID();
      const memoryData = {
        id: memoryId,
        title: 'テストメモリー',
        description: 'これはテストメモリーの説明です',
        tags: ['重要', 'テスト'],
      };

      // Act（実行）
      const result = await memoryGraphRepository.create(memoryData);

      // Assert（検証）
      const memories = parseToGraphDbMemoryNodeList(result);
      expect(memories).toHaveLength(1);
      expect(memories[0].id).toBe(memoryId);
      expect(memories[0].title).toBe('テストメモリー');
      expect(memories[0].description).toBe('これはテストメモリーの説明です');
      expect(memories[0].tags).toEqual(['重要', 'テスト']);
    });
  });

  describe('linkToCharacter', () => {
    it('PlayerCharacterとMemoryをリレーションで接続できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const memoryId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // Memory作成
      await memoryGraphRepository.create({
        id: memoryId,
        title: 'テストメモリー',
        description: '説明',
        tags: ['タグ'],
      });

      // Act（実行）
      await memoryGraphRepository.linkToCharacter(characterId, memoryId, 5);

      // Assert（検証）
      const result = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_MEMORY]->(m:Memory {id: '${memoryId}'})
        RETURN r.sortOrder AS sortOrder
      `);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect((result as { sortOrder: number }[])[0].sortOrder).toBe(5);
    });
  });

  describe('unlinkFromCharacter', () => {
    it('PlayerCharacterとMemoryのリレーションを削除できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const memoryId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // Memory作成
      await memoryGraphRepository.create({
        id: memoryId,
        title: 'テストメモリー',
        description: '説明',
        tags: ['タグ'],
      });

      // リレーション作成
      await memoryGraphRepository.linkToCharacter(characterId, memoryId, 0);

      // 削除前にリレーション存在確認
      const beforeDelete = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_MEMORY]->(m:Memory {id: '${memoryId}'})
        RETURN r
      `);
      expect(Array.isArray(beforeDelete)).toBe(true);
      expect(beforeDelete).toHaveLength(1);

      // Act（実行）
      await memoryGraphRepository.unlinkFromCharacter(characterId, memoryId);

      // Assert（検証）
      const afterDelete = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_MEMORY]->(m:Memory {id: '${memoryId}'})
        RETURN r
      `);
      expect(Array.isArray(afterDelete)).toBe(true);
      expect(afterDelete).toHaveLength(0);
    });
  });

  describe('updateSortOrder', () => {
    it('メモリーの並び順を更新できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const memoryId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // Memory作成
      await memoryGraphRepository.create({
        id: memoryId,
        title: 'テストメモリー',
        description: '説明',
        tags: ['タグ'],
      });

      // リレーション作成（sortOrder: 0）
      await memoryGraphRepository.linkToCharacter(characterId, memoryId, 0);

      // Act（実行）sortOrderを10に更新
      await memoryGraphRepository.updateSortOrder(characterId, memoryId, 10);

      // Assert（検証）
      const result = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_MEMORY]->(m:Memory {id: '${memoryId}'})
        RETURN r.sortOrder AS sortOrder
      `);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect((result as { sortOrder: number }[])[0].sortOrder).toBe(10);
    });
  });

  describe('update', () => {
    it('Memoryノードを更新できる', async () => {
      // Arrange（準備）
      const memoryId = generateUUID();

      // Memory作成
      await memoryGraphRepository.create({
        id: memoryId,
        title: '元のタイトル',
        description: '元の説明',
        tags: ['元のタグ'],
      });

      // Act（実行）
      const result = await memoryGraphRepository.update({
        id: memoryId,
        title: '新しいタイトル',
        description: '新しい説明',
        tags: ['新しいタグ1', '新しいタグ2'],
      });

      // Assert（検証）
      const memories = parseToGraphDbMemoryNodeList(result);
      expect(memories).toHaveLength(1);
      expect(memories[0].id).toBe(memoryId);
      expect(memories[0].title).toBe('新しいタイトル');
      expect(memories[0].description).toBe('新しい説明');
      expect(memories[0].tags).toEqual(['新しいタグ1', '新しいタグ2']);
    });
  });

  describe('delete', () => {
    it('Memoryノードとそのリレーションを削除できる', async () => {
      // Arrange（準備）
      const characterId = generateUUID();
      const memoryId = generateUUID();

      // PlayerCharacter作成
      await executeQuery(`
        CREATE (pc:PlayerCharacter {id: '${characterId}'})
      `);

      // Memory作成
      await memoryGraphRepository.create({
        id: memoryId,
        title: 'テストメモリー',
        description: '説明',
        tags: ['タグ'],
      });

      // リレーション作成
      await memoryGraphRepository.linkToCharacter(characterId, memoryId, 0);

      // 削除前に存在確認
      const beforeDelete = await executeQuery(`
        MATCH (m:Memory {id: '${memoryId}'})
        RETURN m.id AS id
      `);
      expect(Array.isArray(beforeDelete)).toBe(true);
      expect(beforeDelete).toHaveLength(1);

      // Act（実行）
      await memoryGraphRepository.delete(memoryId);

      // Assert（検証）
      const afterDelete = await executeQuery(`
        MATCH (m:Memory {id: '${memoryId}'})
        RETURN m.id AS id
      `);
      expect(Array.isArray(afterDelete)).toBe(true);
      expect(afterDelete).toHaveLength(0);

      // リレーションも削除されていることを確認
      const relationCheck = await executeQuery(`
        MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_MEMORY]->(m:Memory {id: '${memoryId}'})
        RETURN r
      `);
      expect(Array.isArray(relationCheck)).toBe(true);
      expect(relationCheck).toHaveLength(0);
    });
  });
});
