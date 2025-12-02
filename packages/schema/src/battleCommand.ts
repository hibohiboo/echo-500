import * as v from 'valibot';
import { OptionalToStringSchema, NumberOrStringToNumberSchema } from './common';

/**
 * バトルコマンドスキーマ
 * ルールブックで使用されるバトルコマンドカードのデータ構造
 */
const BattleCommandSchema = v.object({
  /** クラス名（職業など） */
  class: v.string(),
  /** コマンド名 */
  name: v.string(),
  /** コストポイント */
  cp: v.number(),
  /** タイミング */
  timing: v.string(),
  /** コスト */
  cost: v.string(),
  /** 射程 */
  range: v.string(),
  /** 効果 */
  effect: v.string(),
  /** 対象 */
  target: v.string(),
  /** フレーバーテキスト */
  flavor: v.string(),
  /** タグ */
  tags: v.array(v.string()),
  /** 詳細説明 */
  details: v.string(),
});

/**
 * グラフDB用のバトルコマンドノード（ID付き、sortOrderなし）
 * BattleCommandSchemaを拡張してidを追加
 */
const GraphDbBattleCommandNodeOnlySchema = v.object({
  ...BattleCommandSchema.entries,
  /** バトルコマンドID */
  id: v.string(),
});

/**
 * グラフDB用のプレイヤーキャラクターのバトルコマンド（並び順付き）
 * GraphDbBattleCommandNodeOnlySchemaを拡張してsortOrderを追加
 */
const GraphDbBattleCommandSchema = v.object({
  ...GraphDbBattleCommandNodeOnlySchema.entries,
  /** 並び順 */
  sortOrder: v.number(),
});

/**
 * プレイヤーキャラクターのバトルコマンド（並び順付き）
 * GraphDbBattleCommandSchemaと同じ
 */
const PlayerCharacterBattleCommandSchema = GraphDbBattleCommandSchema;

/**
 * バトルコマンド作成・更新用の入力データスキーマ
 * BattleCommandSchemaからidを除外
 */
const BattleCommandFormDataSchema = v.omit(PlayerCharacterBattleCommandSchema, [
  'id',
]);

/**
 * ルールブック用のバトルコマンドの型
 */
export type BattleCommand = v.InferOutput<typeof BattleCommandSchema>;

/**
 * GraphDB用のバトルコマンドノードの型（ID付き、sortOrderなし）
 */
export type GraphDbBattleCommandNode = v.InferOutput<
  typeof GraphDbBattleCommandNodeOnlySchema
>;

/**
 * GraphDB用のバトルコマンドの型（ID付き、sortOrder付き）
 */
export type GraphDbBattleCommand = v.InferOutput<
  typeof GraphDbBattleCommandSchema
>;

/**
 * プレイヤーキャラクターのバトルコマンド型（並び順付き）
 */
export type PlayerCharacterBattleCommand = v.InferOutput<
  typeof PlayerCharacterBattleCommandSchema
>;

/**
 * バトルコマンド作成・更新用の入力データ型
 */
export type BattleCommandFormData = v.InferOutput<
  typeof BattleCommandFormDataSchema
>;

/**
 * バトルコマンドをパース
 */
export const parseToBattleCommand = (data: unknown): BattleCommand => {
  return v.parse(BattleCommandSchema, data);
};

/**
 * バトルコマンドリストをパース
 */
export const parseToBattleCommandList = (data: unknown): BattleCommand[] => {
  return v.parse(v.array(BattleCommandSchema), data);
};

/**
 * プレイヤーキャラクターのバトルコマンドをパース
 */
export const parseToPlayerCharacterBattleCommand = (
  data: unknown,
): PlayerCharacterBattleCommand => {
  return v.parse(PlayerCharacterBattleCommandSchema, data);
};

/**
 * プレイヤーキャラクターのバトルコマンドリストをパース
 */
export const parseToPlayerCharacterBattleCommandList = (
  data: unknown,
): PlayerCharacterBattleCommand[] => {
  return v.parse(v.array(PlayerCharacterBattleCommandSchema), data);
};

// === Payload Schemas ===

/**
 * バトルコマンド作成ペイロードスキーマ
 */
export const CreateBattleCommandPayloadSchema = BattleCommandFormDataSchema;

/**
 * バトルコマンド更新ペイロードスキーマ
 */
export const UpdateBattleCommandPayloadSchema = v.object({
  id: v.string(),
  data: BattleCommandFormDataSchema,
});

/**
 * バトルコマンドID取得ペイロードスキーマ
 */
export const BattleCommandIdPayloadSchema = v.object({
  id: v.string(),
});

/**
 * バトルコマンドをプレイヤーキャラクターにリンクするペイロードスキーマ
 */
export const LinkBattleCommandPayloadSchema = v.object({
  characterId: v.string(),
  commandId: v.string(),
  sortOrder: v.number(),
});

/**
 * バトルコマンドのリンクを解除するペイロードスキーマ
 */
export const UnlinkBattleCommandPayloadSchema = v.object({
  characterId: v.string(),
  commandId: v.string(),
});

/**
 * バトルコマンドの並び順を更新するペイロードスキーマ
 */
export const UpdateBattleCommandSortOrderPayloadSchema = v.object({
  characterId: v.string(),
  commandId: v.string(),
  sortOrder: v.number(),
});

// === Payload Parse Functions ===

export const parseCreateBattleCommandPayload = (data: unknown) => {
  return v.parse(CreateBattleCommandPayloadSchema, data);
};

export const parseUpdateBattleCommandPayload = (data: unknown) => {
  return v.parse(UpdateBattleCommandPayloadSchema, data);
};

export const parseBattleCommandIdPayload = (data: unknown) => {
  return v.parse(BattleCommandIdPayloadSchema, data);
};

export const parseLinkBattleCommandPayload = (data: unknown) => {
  return v.parse(LinkBattleCommandPayloadSchema, data);
};

export const parseUnlinkBattleCommandPayload = (data: unknown) => {
  return v.parse(UnlinkBattleCommandPayloadSchema, data);
};

export const parseUpdateBattleCommandSortOrderPayload = (data: unknown) => {
  return v.parse(UpdateBattleCommandSortOrderPayloadSchema, data);
};

// === Worker Handler Parse Functions ===

/**
 * バトルコマンドフォームデータをパース
 */
export const parseBattleCommandFormData = (
  data: unknown,
): BattleCommandFormData => {
  return v.parse(BattleCommandFormDataSchema, data);
};

/**
 * バトルコマンドIDをパース
 */
export const parseBattleCommandId = (data: unknown): { id: string } => {
  return v.parse(BattleCommandIdPayloadSchema, data);
};

/**
 * 重複チェックペイロードをパース
 */
export const parseCheckDuplicateBattleCommandPayload = (
  data: unknown,
): { characterId: string; className: string; commandName: string } => {
  const schema = v.object({
    characterId: v.string(),
    className: v.string(),
    commandName: v.string(),
  });
  return v.parse(schema, data);
};

/**
 * sortOrder更新ペイロードをパース
 */
export const parseUpdateSortOrderPayload = (
  data: unknown,
): { characterId: string; commandId: string; sortOrder: number } => {
  return v.parse(UpdateBattleCommandSortOrderPayloadSchema, data);
};

// === Parse Functions ===

const ExternalBattleCommandRawSchema = v.object({
  class: OptionalToStringSchema,
  name: OptionalToStringSchema,
  cp: NumberOrStringToNumberSchema,
  timing: OptionalToStringSchema,
  cost: OptionalToStringSchema,
  range: OptionalToStringSchema,
  effect: OptionalToStringSchema,
  target: OptionalToStringSchema,
  flavor: OptionalToStringSchema,
  tags: OptionalToStringSchema, // JSON文字列
  details: OptionalToStringSchema,
});

/**
 * GraphDBから取得したバトルコマンド（tagsがJSON文字列、sortOrder付き）のスキーマ
 * KuzuDBは空文字列をnullとして復元するため、OptionalToStringSchemaを使用
 */
const GraphDbBattleCommandRawSchema = v.object({
  ...ExternalBattleCommandRawSchema.entries,
  id: OptionalToStringSchema,
  sortOrder: NumberOrStringToNumberSchema,
});

/**
 * GraphDBのバトルコマンドリストをパース（tagsをJSON.parseで配列に変換、sortOrder付き）
 */
export const parseToGraphDbBattleCommandList = (
  data: unknown,
): PlayerCharacterBattleCommand[] => {
  const rawList = v.parse(v.array(GraphDbBattleCommandRawSchema), data);
  return rawList.map((item) =>
    parseToPlayerCharacterBattleCommand({
      ...item,
      tags: JSON.parse(item.tags ?? '[]') as string[],
    }),
  );
};

/**
 * SpreadSheetのバトルコマンドリストをパース（tagsをJSON.parseで配列に変換、sortOrder付き）
 */
export const parseToExternalBattleCommand = (data: unknown): BattleCommand => {
  const raw = v.parse(ExternalBattleCommandRawSchema, data);
  return parseToBattleCommand({
    ...raw,
    tags: raw.tags?.split(','),
  });
};
