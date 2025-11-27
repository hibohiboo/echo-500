import { useNavigate, useLoaderData } from 'react-router';
import { deleteCharacter } from '@/entities/character';
import type { Character } from '@/entities/character';
import {
  useCharacterDetail,
  CharacterDetailView,
} from '@/feature/characterManagement';

export default function CharacterDetailPage() {
  const navigate = useNavigate();
  const character = useLoaderData<Character>();

  const detailState = useCharacterDetail({ character });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      deleteCharacter(character.id);
      navigate('/');
    }
  };

  return (
    <CharacterDetailView
      {...detailState}
      onEdit={() => navigate(`/edit/${character.id}`)}
      onDelete={handleDelete}
      onBack={() => navigate('/')}
    />
  );
}
