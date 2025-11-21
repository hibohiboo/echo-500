export interface MemorySlot {
  title: string;
  description: string;
  tags: string[];
}

export interface Character {
  id: string;
  name: string;
  memorySlots: MemorySlot[];
}
