import { useState } from 'react';
import type { BattleFrame } from '@/entities/character';

interface UseBattleFrameFormProps {
  initialBattleFrame: BattleFrame;
}

const battleFramePresets = {
  basic: {
    hp: 20,
    evasion: 5,
    armor: 2,
    initialCount: 5,
    movement: 3,
    size: 1 as const,
  },
  light: {
    hp: 15,
    evasion: 7,
    armor: 0,
    initialCount: 3,
    movement: 5,
    size: 1 as const,
  },
  heavy: {
    hp: 30,
    evasion: 3,
    armor: 5,
    initialCount: 8,
    movement: 2,
    size: 1 as const,
  },
};

export function useBattleFrameForm({
  initialBattleFrame,
}: UseBattleFrameFormProps) {
  const [battleFrame, setBattleFrame] =
    useState<BattleFrame>(initialBattleFrame);

  const createBattleFrame = (preset: 'basic' | 'light' | 'heavy' = 'basic') => {
    setBattleFrame({
      stats: { ...battleFramePresets[preset] },
      type: preset,
    });
  };

  const updateBattleFrame = (
    field: keyof typeof battleFramePresets.basic,
    value: number,
  ) => {
    if (!battleFrame) return;
    setBattleFrame({
      ...battleFrame,
      stats: { ...battleFrame.stats, [field]: value },
    });
  };

  const removeBattleFrame = () => {
    setBattleFrame(null);
  };

  return {
    battleFrame,
    createBattleFrame,
    updateBattleFrame,
    removeBattleFrame,
  };
}
