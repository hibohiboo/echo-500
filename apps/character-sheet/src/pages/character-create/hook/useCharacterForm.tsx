import { useNavigate } from 'react-router';
import { useCreatePlayerCharacter } from '@/entities/playerCharacter';
import type { FormEventHandler } from 'react';

export const useCharacterForm = () => {
  const navigate = useNavigate();
  const createCharacterHook = useCreatePlayerCharacter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name') as string;
    if (!name) return;
    await createCharacterHook.submit(name);
    navigate('/');
  };
  const onCancel = () => {
    navigate('/');
  };
  return {
    handleSubmit,
    onCancel,
  };
};
