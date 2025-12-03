import { useLoaderData, useNavigate } from 'react-router';
import { useDeletePlayerCharacter } from '@/entities/playerCharacter';
import type { CharacterDetailData } from '../loader';

export const useDetailPage = () => {
  const navigate = useNavigate();
  const character = useLoaderData() as CharacterDetailData;
  const { handleDelete } = useDeletePlayerCharacter();
  const onEdit = () => navigate(`/edit/${character.id}`);
  const onDelete = async () => {
    await handleDelete(character.id);
    navigate('/');
  };
  const onBack = () => navigate('/');
  return {
    onEdit,
    onDelete,
    onBack,
    character,
  };
};
