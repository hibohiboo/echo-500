import * as v from 'valibot';

/**
 * バトルコマンドスキーマ
 * ルールブックで使用されるバトルコマンドカードのデータ構造
 */
export const BattleCommandSchema = v.object({
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
 * プレイヤーキャラクターのバトルコマンド（並び順付き）
 * BattleCommandSchemaを拡張してidとsortOrderを追加
 */
export const PlayerCharacterBattleCommandSchema = v.object({
  ...BattleCommandSchema.entries,
  /** バトルコマンドID */
  id: v.string(),
  /** 並び順 */
  sortOrder: v.number(),
});

/**
 * バトルコマンド作成・更新用の入力データスキーマ
 * BattleCommandSchemaからidを除外
 */
export const BattleCommandFormDataSchema = v.omit(
  PlayerCharacterBattleCommandSchema,
  ['id'],
);

/**
 * バトルコマンドの型
 */
export type BattleCommand = v.InferOutput<typeof BattleCommandSchema>;

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
