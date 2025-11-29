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

  describe('findAll', () => {
    it('プレイヤーキャラクターが0件の場合、空配列を返す', async () => {
      // Arrange（準備）
      // データなし

      // Act（実行）
      const characters = await repository.findAll();

      // Assert（検証）
      expect(characters).toEqual([]);
    });

    it('全プレイヤーキャラクターを更新日時の降順で取得できる', async () => {
      // Arrange（準備）
      const character1 = await repository.create({
        id: generateUUID(),
        name: '冒険者1',
      });

      // 少し待機して更新日時を異なるものにする
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });

      const character2 = await repository.create({
        id: generateUUID(),
        name: '冒険者2',
      });

      // Act（実行）
      const characters = await repository.findAll();

      // Assert（検証）
      expect(characters).toHaveLength(2);
      // 新しいものが先頭に来る
      expect(characters[0].id).toBe(character2.id);
      expect(characters[1].id).toBe(character1.id);
    });
  });

  describe('findById', () => {
    it('存在するIDでプレイヤーキャラクターを取得できる', async () => {
      // Arrange（準備）
      const newCharacter = await repository.create({
        id: generateUUID(),
        name: 'テスト冒険者',
      });

      // Act（実行）
      const result = await repository.findById(newCharacter.id);

      // Assert（検証）
      expect(result).toBeDefined();
      expect(result?.id).toBe(newCharacter.id);
      expect(result?.name).toBe(newCharacter.name);
    });

    it('存在しないIDの場合、nullを返す', async () => {
      // Arrange（準備）
      const nonExistentId = generateUUID();

      // Act（実行）
      const result = await repository.findById(nonExistentId);

      // Assert（検証）
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('既存のプレイヤーキャラクターを更新できる', async () => {
      // Arrange（準備）
      const newCharacter = {
        id: generateUUID(),
        name: '更新前の冒険者',
      };
      const created = await repository.create(newCharacter);

      // 少し待機して更新日時が確実に異なるようにする
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });

      // Act（実行）
      const updated = await repository.update(created.id, {
        name: '更新後の冒険者',
      });

      // Assert（検証）
      expect(updated).toBeDefined();
      expect(updated.name).toBe('更新後の冒険者');
      expect(updated.updatedAt.getTime()).toBeGreaterThan(
        created.updatedAt.getTime(),
      );
    });
  });

  describe('delete', () => {
    it('プレイヤーキャラクターを削除できる', async () => {
      // Arrange（準備）
      const newCharacter = {
        id: generateUUID(),
        name: '削除対象冒険者',
      };
      const created = await repository.create(newCharacter);

      // 削除前に存在確認
      const beforeDelete = await repository.findAll();
      const exists = beforeDelete.some((c) => c.id === created.id);
      expect(exists).toBe(true);

      // Act（実行）
      await repository.delete(created.id);

      // Assert（検証）
      const afterDelete = await repository.findAll();
      const notExists = !afterDelete.some((c) => c.id === created.id);
      expect(notExists).toBe(true);
    });
  });
});
