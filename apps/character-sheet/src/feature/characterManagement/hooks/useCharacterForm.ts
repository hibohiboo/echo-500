import { useState } from 'react';
import {
  createCharacter,
  updateCharacter,
  createInitialMemorySlots,
} from '@/entities/character';
import type {
  Character,
  MemorySlot,
  BattleFrame,
  BattleStyleType,
} from '@/entities/character';

interface UseCharacterFormProps {
  character?: Character;
  onSave: () => void;
}

export function useCharacterForm({ character, onSave }: UseCharacterFormProps) {
  const [name, setName] = useState(character?.name || '');
  const [memorySlots, setMemorySlots] = useState<MemorySlot[]>(
    character?.memorySlots || createInitialMemorySlots(),
  );
  const [battleFrame, setBattleFrame] = useState<BattleFrame>(
    character?.battleFrame || null,
  );
  const [battleStyles, setBattleStyles] = useState<BattleStyleType[]>(
    character?.battleStyles || [],
  );
  const [battleCommands, setBattleCommands] = useState<string[]>(
    character?.battleCommands || [],
  );
  const [error, setError] = useState('');

  const validateForm = (): string | null => {
    if (!name.trim()) {
      return 'Character name is required';
    }
    if (memorySlots.length === 0) {
      return 'At least one memory slot is required';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const characterData = {
      name: name.trim(),
      memorySlots,
      battleFrame: battleFrame || undefined,
      battleStyles: battleStyles.length > 0 ? battleStyles : undefined,
      battleCommands: battleCommands.length > 0 ? battleCommands : undefined,
    };

    if (character) {
      updateCharacter(character.id, characterData);
    } else {
      createCharacter(characterData);
    }

    onSave();
  };

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
    const updated = [...memorySlots];
    const trimmedTag = tag.trim();
    if (trimmedTag && !updated[slotIndex].tags.includes(trimmedTag)) {
      updated[slotIndex] = {
        ...updated[slotIndex],
        tags: [...updated[slotIndex].tags, trimmedTag],
      };
      setMemorySlots(updated);
    }
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

  const toggleBattleStyle = (style: BattleStyleType) => {
    if (battleStyles.includes(style)) {
      setBattleStyles(battleStyles.filter((s) => s !== style));
    } else {
      setBattleStyles([...battleStyles, style]);
    }
  };

  const toggleBattleCommand = (commandName: string) => {
    if (battleCommands.includes(commandName)) {
      setBattleCommands(battleCommands.filter((c) => c !== commandName));
    } else {
      setBattleCommands([...battleCommands, commandName]);
    }
  };

  return {
    // Form state
    name,
    setName,
    memorySlots,
    battleFrame,
    battleStyles,
    battleCommands,
    error,
    setError,

    // Form actions
    handleSubmit,

    // Memory slot actions
    updateMemorySlot,
    addTag,
    removeTag,
    deleteMemorySlot,
    addMemorySlot,

    // Battle frame actions
    createBattleFrame,
    updateBattleFrame,
    removeBattleFrame,

    // Battle style actions
    toggleBattleStyle,

    // Battle command actions
    toggleBattleCommand,

    // Validation
    validateForm,
  };
}
