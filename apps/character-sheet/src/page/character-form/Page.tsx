import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getCharacter } from '@/entities/character';
import type { Character } from '@/entities/character';
import {
  useCharacterForm,
  CharacterFormView,
} from '@/feature/characterManagement';

export default function CharacterFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | undefined>();

  useEffect(() => {
    if (id) {
      const char = getCharacter(id);
      setCharacter(char);
    }
  }, [id]);

  const formState = useCharacterForm({
    character,
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
