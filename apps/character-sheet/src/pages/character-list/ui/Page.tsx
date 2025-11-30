import { useNavigate, useLoaderData, useRevalidator } from 'react-router';
import { CharacterListView } from '@/feature/characterManagement';
import type { CharacterListItem } from '@/feature/characterManagement/ui/CharacterListView';
import { useCharacterList } from '../hooks/useCharacterList';

export default function CharacterListPage() {
  const navigate = useNavigate();
  const characters = useLoaderData<CharacterListItem[]>();
  const revalidator = useRevalidator();

  const { handleDelete } = useCharacterList({ characters });

  return (
    <CharacterListView
      characters={characters}
      onCreateNew={() => navigate('/create')}
      onViewDetail={(id) => navigate(`/character/${id}`)}
      onEdit={(id) => navigate(`/edit/${id}`)}
      onDelete={async (id) => {
        await handleDelete(id);
        revalidator.revalidate();
      }}
    />
  );
}
