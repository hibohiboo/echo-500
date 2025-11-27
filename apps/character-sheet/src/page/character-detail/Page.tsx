import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getCharacter, deleteCharacter } from '@/entities/character';
import type { Character } from '@/entities/character';
import {
  useCharacterDetail,
  CharacterDetailView,
} from '@/feature/characterManagement';

export default function CharacterDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | undefined>();

  useEffect(() => {
    if (id) {
      const char = getCharacter(id);
      setCharacter(char);
      if (!char) {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const detailState = useCharacterDetail({ character: character! });

  const handleDelete = () => {
    if (
      id &&
      window.confirm('Are you sure you want to delete this character?')
    ) {
      deleteCharacter(id);
      navigate('/');
    }
  };

  if (!character) {
    return null;
  }

  return (
    <CharacterDetailView
      {...detailState}
      onEdit={() => navigate(`/edit/${id}`)}
      onDelete={handleDelete}
      onBack={() => navigate('/')}
    />
  );
}
