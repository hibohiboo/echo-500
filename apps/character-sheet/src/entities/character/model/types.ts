import type { BattleFrameStats } from '@echo-500/schema';

export { BATTLE_FRAME_PRESETS, BATTLE_STYLES } from '@echo-500/frontend-common';
export type {
  BattleFramePresetType,
  BattleStyleType,
} from '@echo-500/frontend-common';

export interface MemorySlot {
  title: string;
  description: string;
  tags: string[];
}

export type BattleFrame = {
  stats: BattleFrameStats;
  type: 'basic' | 'light' | 'heavy';
} | null;

export interface Character {
  id: string;
  name: string;
  memorySlots: MemorySlot[];
  battleFrame?: BattleFrame;
  battleStyles?: Array<'saber' | 'gunner' | 'wizard'>;
  battleCommands?: string[];
}
