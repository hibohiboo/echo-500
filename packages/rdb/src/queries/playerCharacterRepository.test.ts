import { generateUUID } from '@echo-500/utility';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { createPlayerCharacterRepository } from './playerCharacterRepository';

describe('playerCharacterRepository', () => {
  let testClient: PGlite;
  let testDb: ReturnType<typeof drizzle>;
  let repository: ReturnType<typeof createPlayerCharacterRepository>;

  beforeAll(async () => {
    // テスト用のインメモリデータベースを作成
    testClient = new PGlite();
    testDb = drizzle(testClient);

    // テーブルを作成
    await testClient.exec(`
      CREATE TABLE IF NOT EXISTS player_characters (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // DI経由でリポジトリを作成
    repository = createPlayerCharacterRepository(testDb);
  });

  afterEach(async () => {
    // 各テスト後にテーブルをクリア
    await testClient.exec('TRUNCATE TABLE player_characters;');
  });

  describe('create', () => {
    it('新しいプレイヤーキャラクターを作成できる', async () => {
      // Arrange（準備）
      const newCharacter = {
        id: generateUUID(),
        name: 'テスト冒険者',
      };

      // Act（実行）
      const result = await repository.create(newCharacter);

      // Assert（検証）
      expect(result).toBeDefined();
      expect(result.id).toBe(newCharacter.id);
      expect(result.name).toBe(newCharacter.name);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });
});
