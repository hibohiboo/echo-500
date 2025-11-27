import { useState } from 'react';
import { createCharacter, updateCharacter } from '@/entities/character';
import type { Character } from '@/entities/character';
import {
  getCharacterOrDefault,
  validateCharacterForm,
  buildCharacterData,
} from './characterFormHelpers';
import { useBattleFrameForm } from './useBattleFrameForm';
import { useBattleStylesForm } from './useBattleStylesForm';
import { useMemorySlots } from './useMemorySlots';

interface UseCharacterFormProps {
  character?: Character;
  onSave: () => void;
}

export function useCharacterForm({ character, onSave }: UseCharacterFormProps) {
  const defaults = getCharacterOrDefault(character);

  const [name, setName] = useState(defaults.name);
  const [error, setError] = useState('');

  const memorySlotState = useMemorySlots({
    initialSlots: defaults.memorySlots,
  });

  const battleFrameState = useBattleFrameForm({
    initialBattleFrame: defaults.battleFrame,
  });

  const battleStylesState = useBattleStylesForm({
    initialBattleStyles: defaults.battleStyles,
    initialBattleCommands: defaults.battleCommands,
  });

  const validateForm = () =>
    validateCharacterForm(name, memorySlotState.memorySlots);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const characterData = buildCharacterData(
      name,
      memorySlotState.memorySlots,
      battleFrameState.battleFrame,
      battleStylesState.battleStyles,
      battleStylesState.battleCommands,
    );

    if (character) {
      updateCharacter(character.id, characterData);
    } else {
      createCharacter(characterData);
    }

    onSave();
  };

  return {
    // Form state
    name,
    setName,
    memorySlots: memorySlotState.memorySlots,
    battleFrame: battleFrameState.battleFrame,
    battleStyles: battleStylesState.battleStyles,
    battleCommands: battleStylesState.battleCommands,
    error,
    setError,

    // Form actions
    handleSubmit,

    // Memory slot actions
    updateMemorySlot: memorySlotState.updateMemorySlot,
    addTag: memorySlotState.addTag,
    removeTag: memorySlotState.removeTag,
    deleteMemorySlot: memorySlotState.deleteMemorySlot,
    addMemorySlot: memorySlotState.addMemorySlot,

    // Battle frame actions
    createBattleFrame: battleFrameState.createBattleFrame,
    updateBattleFrame: battleFrameState.updateBattleFrame,
    removeBattleFrame: battleFrameState.removeBattleFrame,

    // Battle style actions
    toggleBattleStyle: battleStylesState.toggleBattleStyle,

    // Battle command actions
    toggleBattleCommand: battleStylesState.toggleBattleCommand,

    // Validation
    validateForm,
  };
}
