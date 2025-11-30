import { useState } from 'react';
import type { MemorySlot } from '@/entities/character';

interface UseMemorySlotsProps {
  initialSlots: MemorySlot[];
}

export function useMemorySlots({ initialSlots }: UseMemorySlotsProps) {
  const [memorySlots, setMemorySlots] = useState<MemorySlot[]>(initialSlots);

  const updateMemorySlot = (
    index: number,
    field: keyof MemorySlot,
    value: string | string[],
  ) => {
    const updated = [...memorySlots];
    updated[index] = { ...updated[index], [field]: value };
    setMemorySlots(updated);
  };

  const addTag = (slotIndex: number, tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    const updated = [...memorySlots];
    const slot = updated[slotIndex];

    if (slot.tags.includes(trimmedTag)) return;

    updated[slotIndex] = {
      ...slot,
      tags: [...slot.tags, trimmedTag],
    };
    setMemorySlots(updated);
  };

  const removeTag = (slotIndex: number, tagIndex: number) => {
    const updated = [...memorySlots];
    updated[slotIndex] = {
      ...updated[slotIndex],
      tags: updated[slotIndex].tags.filter((_, i) => i !== tagIndex),
    };
    setMemorySlots(updated);
  };

  const deleteMemorySlot = (index: number) => {
    setMemorySlots(memorySlots.filter((_, i) => i !== index));
  };

  const addMemorySlot = () => {
    setMemorySlots([
      ...memorySlots,
      {
        title: '',
        description: '',
        tags: [],
      },
    ]);
  };

  return {
    memorySlots,
    updateMemorySlot,
    addTag,
    removeTag,
    deleteMemorySlot,
    addMemorySlot,
  };
}
