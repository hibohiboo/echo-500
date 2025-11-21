export interface MemorySlot {
  title: string;
  description: string;
  tags: string[];
}

export interface BattleFrame {
  hp: number;
  evasion: number;
  armor: number;
  initialCount: number;
  movement: number;
  size: 1 | 2;
}

export interface Character {
  id: string;
  name: string;
  memorySlots: MemorySlot[];
  battleFrame?: BattleFrame;
}
