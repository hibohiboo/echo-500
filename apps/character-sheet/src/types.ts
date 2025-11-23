import type { BattleFrameStats } from '@trpg-scenario-maker/schema';

export { BATTLE_FRAME_PRESETS } from '@trpg-scenario-maker/frontend-common';
export type { BattleFramePresetType } from '@trpg-scenario-maker/frontend-common';

export interface MemorySlot {
  title: string;
  description: string;
  tags: string[];
}

export type BattleFrame = BattleFrameStats;

export interface Character {
  id: string;
  name: string;
  memorySlots: MemorySlot[];
  battleFrame?: BattleFrame;
}
