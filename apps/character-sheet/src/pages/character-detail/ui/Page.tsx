import { useNavigate, useLoaderData } from 'react-router';
import type { Character } from '@/entities/character';
import { useDeletePlayerCharacter } from '@/entities/playerCharacter';
import {
  useCharacterDetail,
  CharacterDetailView,
} from '@/feature/characterManagement';

export default function CharacterDetailPage() {
  const navigate = useNavigate();
  const character = useLoaderData<Character>();
  const detailState = useCharacterDetail({ character });
  const deleteCharacterHook = useDeletePlayerCharacter();

  return (
    <CharacterDetailView
      {...detailState}
      onEdit={() => navigate(`/edit/${character.id}`)}
      onDelete={async () => {
        if (!window.confirm(`「${character.name}」を削除しますか？`)) return;
        await deleteCharacterHook.submit(character.id);
        navigate('/');
      }}
      onBack={() => navigate('/')}
    />
  );
}
