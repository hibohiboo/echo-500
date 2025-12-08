/**
 * プレイヤーキャラクター型（UI層用）
 */
export interface PlayerCharacter {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * プレイヤーキャラクターフォームデータ型
 */
export interface PlayerCharacterFormData {
  name: string;
}

/**
 * バトルコマンド型（UI層用）
 */
export interface BattleCommand {
  id: string;
  class: string;
  name: string;
  cp: number;
  timing: string;
  cost: string;
  range: string;
  effect: string;
  target: string;
  flavor: string;
  tags: string[];
  details: string;
  sortOrder: number;
}

/**
 * バトルコマンドフォームデータ型
 */
export interface BattleCommandFormData {
  class: string;
  name: string;
  cp: number;
  timing: string;
  cost: string;
  range: string;
  effect: string;
  target: string;
  flavor: string;
  tags: string[];
  details: string;
}
