import * as v from 'valibot';

/**
 * プレイヤーキャラクタースキーマ（Date型）
 * UI層で使用するスキーマ
 */
export const PlayerCharacterSchema = v.object({
  /** プレイヤーキャラクターID */
  id: v.string(),
  /** キャラクター名 */
  name: v.string(),
  /** 作成日時 */
  createdAt: v.date(),
  /** 更新日時 */
  updatedAt: v.date(),
});

/**
 * プレイヤーキャラクタースキーマ（string型）
 * API層やRedux Stateで使用するスキーマ
 */
export const SerializablePlayerCharacterSchema = v.object({
  /** プレイヤーキャラクターID */
  id: v.string(),
  /** キャラクター名 */
  name: v.string(),
  /** 作成日時 */
  createdAt: v.string(),
  /** 更新日時 */
  updatedAt: v.string(),
});

/**
 * プレイヤーキャラクター作成用の入力データスキーマ
 * PlayerCharacterSchemaからid, createdAt, updatedAtを除外
 */
export const PlayerCharacterFormDataSchema = v.omit(PlayerCharacterSchema, [
  'id',
  'createdAt',
  'updatedAt',
]);

/**
 * プレイヤーキャラクター更新用の入力データスキーマ
 * nameのみ更新可能
 */
export const UpdatePlayerCharacterDataSchema = v.object({
  /** キャラクター名 */
  name: v.string(),
});

/**
 * プレイヤーキャラクターの型（Date型）
 */
export type PlayerCharacter = v.InferOutput<typeof PlayerCharacterSchema>;

/**
 * プレイヤーキャラクターの型（string型）
 */
export type SerializablePlayerCharacter = v.InferOutput<
  typeof SerializablePlayerCharacterSchema
>;

/**
 * プレイヤーキャラクター作成用の入力データ型
 */
export type PlayerCharacterFormData = v.InferOutput<
  typeof PlayerCharacterFormDataSchema
>;

/**
 * プレイヤーキャラクター更新用の入力データ型
 */
export type UpdatePlayerCharacterData = v.InferOutput<
  typeof UpdatePlayerCharacterDataSchema
>;

/**
 * PlayerCharacter（Date型）をSerializablePlayerCharacter（string型）に変換
 */
export function playerCharacterToString(
  playerCharacter: PlayerCharacter,
): SerializablePlayerCharacter {
  return {
    id: playerCharacter.id,
    name: playerCharacter.name,
    createdAt: playerCharacter.createdAt.toISOString(),
    updatedAt: playerCharacter.updatedAt.toISOString(),
  };
}

/**
 * SerializablePlayerCharacter（string型）をPlayerCharacter（Date型）に変換
 */
export function stringToPlayerCharacter(
  playerCharacterString: SerializablePlayerCharacter,
): PlayerCharacter {
  return {
    id: playerCharacterString.id,
    name: playerCharacterString.name,
    createdAt: new Date(playerCharacterString.createdAt),
    updatedAt: new Date(playerCharacterString.updatedAt),
  };
}

/**
 * パース時にstring型に変換するスキーマ
 * API等から取得したデータをSerializablePlayerCharacter型に変換する
 */
export const parseToPlayerCharacterString = (
  data: unknown,
): SerializablePlayerCharacter => {
  return v.parse(SerializablePlayerCharacterSchema, data);
};

/**
 * パース時にDate型に変換するスキーマ
 * SerializablePlayerCharacterからPlayerCharacterに変換する
 */
export const parseToPlayerCharacter = (data: unknown): PlayerCharacter => {
  // まずSerializablePlayerCharacterとしてパース
  const playerCharacterString = v.parse(SerializablePlayerCharacterSchema, data);
  // その後Date型に変換
  return stringToPlayerCharacter(playerCharacterString);
};

// === Payload Schemas ===

/**
 * プレイヤーキャラクター作成ペイロードスキーマ
 */
export const CreatePlayerCharacterPayloadSchema = v.object({
  name: v.string(),
});

/**
 * プレイヤーキャラクター更新ペイロードスキーマ
 */
export const UpdatePlayerCharacterPayloadSchema = v.object({
  id: v.string(),
  data: v.object({
    name: v.string(),
  }),
});

/**
 * プレイヤーキャラクターID取得ペイロードスキーマ
 */
export const PlayerCharacterIdPayloadSchema = v.object({
  id: v.string(),
});

// === Payload Parse Functions ===

export const parseCreatePlayerCharacterPayload = (data: unknown) => {
  return v.parse(CreatePlayerCharacterPayloadSchema, data);
};

export const parseUpdatePlayerCharacterPayload = (data: unknown) => {
  return v.parse(UpdatePlayerCharacterPayloadSchema, data);
};

export const parsePlayerCharacterIdPayload = (data: unknown) => {
  return v.parse(PlayerCharacterIdPayloadSchema, data);
};

// === Response Parse Functions ===

/**
 * プレイヤーキャラクターレスポンスをパース（string型）
 */
export const parsePlayerCharacter = (
  data: unknown,
): SerializablePlayerCharacter => {
  return playerCharacterToString(v.parse(PlayerCharacterSchema, data));
};

/**
 * プレイヤーキャラクターリストをパース（string型）
 */
export const parsePlayerCharacterList = (
  data: unknown,
): SerializablePlayerCharacter[] => {
  return v.parse(v.array(PlayerCharacterSchema), data).map(playerCharacterToString);
};

// === GraphDB Parse Functions ===

/**
 * GraphDBから取得したPlayerCharacterノード（IDのみ）のスキーマ
 */
export const GraphDbPlayerCharacterNodeSchema = v.object({
  id: v.string(),
});

export type GraphDbPlayerCharacterNode = v.InferOutput<
  typeof GraphDbPlayerCharacterNodeSchema
>;

/**
 * GraphDBのPlayerCharacterノードリストをパース
 */
export const parseToPlayerCharacterNodeList = (
  data: unknown,
): GraphDbPlayerCharacterNode[] => {
  return v.parse(v.array(GraphDbPlayerCharacterNodeSchema), data);
};
