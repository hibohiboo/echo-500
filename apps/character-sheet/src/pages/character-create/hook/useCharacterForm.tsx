import { generateUUID } from '@echo-500/utility';
import { useNavigate } from 'react-router';
import { createInitialMemorySlots } from '@/entities/character';
import { createMemoryNode } from '@/entities/memory';
import { createPlayerCharacter } from '@/entities/playerCharacter';
import { createAndLinkBattleCommand } from '@/features/playerCharacterBattleCommandManagement';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import {
  setName,
  setIsSubmitting,
  resetForm,
} from '../model/characterCreateSlice';
import { useBattleCommands } from './useBattleCommands';
import { useMemorySlots } from './useMemorySlots';
import type { FormEventHandler } from 'react';

export const useCharacterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, isSubmitting } = useAppSelector(
    (state) => state.characterCreate,
  );
  const memoryModel = useMemorySlots({
    initialSlots: createInitialMemorySlots().map((s) => ({
      ...s,
      id: generateUUID(),
    })),
  });
  const battleCommandModel = useBattleCommands();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!name.trim() || isSubmitting) return;

    dispatch(setIsSubmitting(true));
    try {
      const id = await dispatch(createPlayerCharacter(name));
      await Promise.all([
        ...battleCommandModel.selectedBattleCommands.map((command, i) => {
          const sortOrder = i + 1;
          return dispatch(
            createAndLinkBattleCommand(
              id,
              { ...command, sortOrder },
              sortOrder,
            ),
          );
        }),
        ...memoryModel.memorySlots.map(async (memory, i) => {
          const sortOrder = i + 1;
          await dispatch(createMemoryNode(memory));
        }),
      ]);
      dispatch(resetForm());
      navigate('/');
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

  const onCancel = () => {
    dispatch(resetForm());
    navigate('/');
  };

  const handleNameChange = (value: string) => {
    dispatch(setName(value));
  };

  return {
    name,
    isSubmitting,
    handleSubmit,
    onCancel,
    handleNameChange,
    ...memoryModel,
    ...battleCommandModel,
  };
};
