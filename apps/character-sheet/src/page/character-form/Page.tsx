import { useNavigate, useLoaderData } from 'react-router';
import type { Character } from '@/entities/character';
import {
  useCharacterForm,
  CharacterFormView,
} from '@/feature/characterManagement';

export default function CharacterFormPage() {
  const navigate = useNavigate();
  const character = useLoaderData<Character | null>();

  const formState = useCharacterForm({
    character: character ?? undefined,
    onSave: () => navigate('/'),
  });

  return (
    <CharacterFormView
      {...formState}
      pageTitle={character ? 'Edit Character' : 'Create New Character'}
      submitButtonText={character ? 'Update' : 'Create'}
      onCancel={() => navigate('/')}
    />
  );
}
