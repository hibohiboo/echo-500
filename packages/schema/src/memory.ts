import * as v from 'valibot';
import { OptionalToStringSchema } from './common';

/**
 * メモリースキーマ
 * キャラクターが所持するメモリーのデータ構造
 */
export const MemorySchema = v.object({
  /** タイトル */
  title: v.string(),
  /** 説明 */
  description: v.string(),
  /** タグ */
  tags: v.array(v.string()),
});

/**
 * グラフDB用のメモリーノード（ID付き、sortOrderなし）
 */
export const GraphDbMemoryNodeOnlySchema = v.object({
  ...MemorySchema.entries,
  id: v.string(),
});

/**
 * グラフDB用のメモリー（並び順付き）
 */
export const GraphDbMemorySchema = v.object({
  ...GraphDbMemoryNodeOnlySchema.entries,
  sortOrder: v.number(),
});

/**
 * プレイヤーキャラクターのメモリー（並び順付き）
 */
export const PlayerCharacterMemorySchema = GraphDbMemorySchema;

// === Types ===

export type Memory = v.InferOutput<typeof MemorySchema>;
export type GraphDbMemoryNode = v.InferOutput<
  typeof GraphDbMemoryNodeOnlySchema
>;
export type GraphDbMemory = v.InferOutput<typeof GraphDbMemorySchema>;
export type PlayerCharacterMemory = v.InferOutput<
  typeof PlayerCharacterMemorySchema
>;

// === GraphDB Parse Functions ===

/**
 * GraphDBから取得したメモリーノード（tagsがJSON文字列、sortOrderなし）
 */
const GraphDbMemoryNodeRawSchema = v.object({
  id: v.string(),
  title: v.string(),
  description: v.string(),
  tags: v.string(), // JSON文字列
});

/**
 * GraphDBから取得したメモリー（tagsがJSON文字列、sortOrder付き）
 * KuzuDBは空文字列をnullとして復元するため、OptionalToStringSchemaを使用
 */
const GraphDbMemoryRawSchema = v.object({
  id: OptionalToStringSchema,
  title: OptionalToStringSchema,
  description: OptionalToStringSchema,
  tags: OptionalToStringSchema, // JSON文字列
  sortOrder: v.number(),
});

export const parseToGraphDbMemoryNodeList = (
  data: unknown,
): GraphDbMemoryNode[] => {
  const rawList = v.parse(v.array(GraphDbMemoryNodeRawSchema), data);
  return rawList.map((item) => ({
    ...item,
    tags: JSON.parse(item.tags) as string[],
  }));
};

export const parseToGraphDbMemoryList = (
  data: unknown,
): PlayerCharacterMemory[] => {
  const rawList = v.parse(v.array(GraphDbMemoryRawSchema), data);
  return rawList.map((item) => ({
    id: item.id ?? '',
    title: item.title ?? '',
    description: item.description ?? '',
    tags: JSON.parse(item.tags ?? '[]') as string[],
    sortOrder: item.sortOrder,
  }));
};

// === Worker Handler Parse Functions ===

export const parseCreateMemoryParams = (data: unknown) => {
  return v.parse(GraphDbMemoryNodeOnlySchema, data);
};

export const parseUpdateMemoryParams = (data: unknown) => {
  return v.parse(GraphDbMemoryNodeOnlySchema, data);
};

export const parseMemoryId = (data: unknown) => {
  return v.parse(v.object({ id: v.string() }), data);
};
const LinkMemorySchema = v.object({
  characterId: v.string(),
  memoryId: v.string(),
  sortOrder: v.number(),
});

export const parseLinkMemoryPayload = (data: unknown) => {
  return v.parse(LinkMemorySchema, data);
};

export const parseUnlinkMemoryPayload = (data: unknown) => {
  return v.parse(v.omit(LinkMemorySchema, ['sortOrder']), data);
};

export const parseUpdateMemorySortOrder = (data: unknown) => {
  return v.parse(LinkMemorySchema, data);
};
