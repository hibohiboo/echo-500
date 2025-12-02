import { useLoaderData, useNavigate } from 'react-router';
import type { Character } from '@/entities/character';
import { useDeletePlayerCharacter } from '@/entities/playerCharacter';
import { useCharacterDetail } from '@/feature/characterManagement';

export const useDetailPage = () => {
  const navigate = useNavigate();
  const character = useLoaderData<Character>();
  const detailState = useCharacterDetail({ character });
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
    detailState,
  };
};
