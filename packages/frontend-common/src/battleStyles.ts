/**
 * 戦闘スタイルの定義
 * キャラクターシートとルールブックで共通利用
 */

/**
 * 戦闘スタイルによるステータス補正
 */
export interface BattleStyleModifier {
  movement?: number;
  evasion?: number;
}

/**
 * 戦闘スタイルの定義
 */
export interface BattleStyle {
  name: string;
  nameEn: string;
  description: string;
  cpCost: number;
  modifier: BattleStyleModifier;
}

/**
 * 戦闘スタイルのプリセットデータ
 */
export const BATTLE_STYLES = {
  saber: {
    name: 'セイバー',
    nameEn: 'Saber',
    description: '近接攻撃を主とするスタイル',
    cpCost: 30,
    modifier: {
      movement: 1,
    },
  },
  gunner: {
    name: 'ガンナー',
    nameEn: 'Gunner',
    description: '遠距離攻撃を主とするスタイル',
    cpCost: 30,
    modifier: {},
  },
  wizard: {
    name: 'ウィザード',
    nameEn: 'Wizard',
    description: '支援妨害を主とするスタイル',
    cpCost: 30,
    modifier: {
      movement: -1,
      evasion: -1,
    },
  },
} as const satisfies Record<string, BattleStyle>;

/**
 * 戦闘スタイルのキー型
 */
export type BattleStyleType = keyof typeof BATTLE_STYLES;

/**
 * すべての戦闘スタイルキーの配列
 */
export const BATTLE_STYLE_KEYS: BattleStyleType[] = [
  'saber',
  'gunner',
  'wizard',
];
