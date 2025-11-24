export interface BattleCommandCardData {
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
