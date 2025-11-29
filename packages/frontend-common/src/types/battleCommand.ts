import type { BattleCommand } from '@echo-500/schema';

/**
 * バトルコマンドカードのデータ型
 * @echo-500/schema の BattleCommand 型をそのまま使用
 */
export type BattleCommandCardData = BattleCommand;

/**
 * バトルコマンドカードコンポーネントのプロパティ
 */
export interface BattleCommandCardProps {
  name: string;
  cp: number;
  timing: string;
  target: string;
  range: string;
  cost: string;
  effect: string;
  flavor?: string;
  tags: string[];
  details?: string;
  onClick?: () => void;
}
