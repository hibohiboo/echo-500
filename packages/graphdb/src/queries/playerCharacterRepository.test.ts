import { parseToPlayerCharacterNodeList } from '@echo-500/schema';
import { generateUUID } from '@echo-500/utility';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { initializeDatabase, closeDatabase, executeQuery } from '../db';
import { graphDbSchemas } from '../schemas';
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
    // 各テスト後にPlayerCharacterノードを全削除
    await executeQuery('MATCH (pc:PlayerCharacter) DETACH DELETE pc');
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
});
