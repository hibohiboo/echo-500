/**
 * 戦闘フレーム（バトルフレーム）の定義
 * Echo:500 バスターシナリオ用のキャラクター戦闘能力
 */

/**
 * 戦闘フレームの基本ステータス
 */
export interface BattleFrameStats {
  /** HP - Hazard Buffer Partition「危険吸収領域」 */
  hp: number;
  /** 回避値 - 2d6で判定、この値未満なら攻撃失敗 */
  evasion: number;
  /** 装甲値 - 受けるダメージをこの値分減少 */
  armor: number;
  /** 初期カウント - カウンターボード上の配置位置 */
  initialCount: number;
  /** 移動力 - 1ターンに移動できるマス数 */
  movement: number;
  /** サイズ - 占有マス (1=1×1, 2=2×2) */
  size: 1 | 2;
}

/**
 * 戦闘フレームプリセットの定義
 */
export interface BattleFramePreset {
  /** 日本語名 */
  name: string;
  /** 英語名 */
  nameEn: string;
  /** 短い説明 */
  description: string;
  /** 詳細説明 */
  descriptionDetail: string;
  /** ステータス */
  stats: BattleFrameStats;
}

