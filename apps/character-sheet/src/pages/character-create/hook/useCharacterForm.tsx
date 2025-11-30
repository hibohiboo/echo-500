import { useNavigate } from 'react-router';
import { createInitialMemorySlots } from '@/entities/character';
import { useCreatePlayerCharacter } from '@/entities/playerCharacter';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import {
  setName,
  setIsSubmitting,
  resetForm,
} from '../model/characterCreateSlice';
import { useMemorySlots } from './useMemorySlots';
import type { FormEventHandler } from 'react';

export const useCharacterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, isSubmitting } = useAppSelector(
    (state) => state.characterCreate,
  );
  const createCharacterHook = useCreatePlayerCharacter();
  const memoryModel = useMemorySlots({
    initialSlots: createInitialMemorySlots(),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!name.trim() || isSubmitting) return;

    dispatch(setIsSubmitting(true));
    try {
      await createCharacterHook.submit(name);
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
  };
};
