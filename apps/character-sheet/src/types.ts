export interface MemorySlot {
  title: string;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  memorySlots: MemorySlot[];
}
