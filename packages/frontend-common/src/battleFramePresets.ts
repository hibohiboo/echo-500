import type { BattleFramePreset } from '@trpg-scenario-maker/schema';

/**
 * 戦闘フレームのプリセットデータ
 * キャラクターシートとルールブックで共通利用
 */
export const BATTLE_FRAME_PRESETS = {
  basic: {
    name: 'ベーシック',
    nameEn: 'Basic',
    description: 'バランス型',
    descriptionDetail:
      '標準的な性能を持つバランス型のフレーム。回避値5は2d6で約83%の命中率となり、HP20で2～3発の攻撃に耐えられる。',
    stats: {
      hp: 20,
      evasion: 5,
      armor: 2,
      initialCount: 5,
      movement: 3,
      size: 1 as const,
    },
  },
  light: {
    name: 'ライト',
    nameEn: 'Light',
    description: '高機動型',
    descriptionDetail:
      '高い回避値と移動力を持つ高機動型。装甲は薄いが、攻撃を避けることに特化している。',
    stats: {
      hp: 15,
      evasion: 7,
      armor: 0,
      initialCount: 3,
      movement: 5,
      size: 1 as const,
    },
  },
  heavy: {
    name: 'ヘビー',
    nameEn: 'Heavy',
    description: '重装甲型',
    descriptionDetail:
      '高いHPと装甲値を持つ重装甲型。機動力は低いが、前線で耐え続けることができる。',
    stats: {
      hp: 30,
      evasion: 3,
      armor: 5,
      initialCount: 8,
      movement: 2,
      size: 1 as const,
    },
  },
} as const satisfies Record<string, BattleFramePreset>;

/**
 * 戦闘フレームプリセットのキー型
 */
export type BattleFramePresetType = keyof typeof BATTLE_FRAME_PRESETS;

/**
 * すべてのプリセットキーの配列
 */
export const BATTLE_FRAME_PRESET_KEYS: BattleFramePresetType[] = [
  'basic',
  'light',
  'heavy',
];
