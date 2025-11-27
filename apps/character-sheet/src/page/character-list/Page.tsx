import { useNavigate, useLoaderData, useRevalidator } from 'react-router';
import type { Character } from '@/entities/character';
import {
  useCharacterList,
  CharacterListView,
} from '@/feature/characterManagement';

export default function CharacterListPage() {
  const navigate = useNavigate();
  const characters = useLoaderData<Character[]>();
  const revalidator = useRevalidator();

  const { handleDelete } = useCharacterList({ characters });

  return (
    <CharacterListView
      characters={characters}
      onCreateNew={() => navigate('/new')}
      onViewDetail={(id) => navigate(`/character/${id}`)}
      onEdit={(id) => navigate(`/edit/${id}`)}
      onDelete={async (id) => {
        await handleDelete(id);
        revalidator.revalidate();
      }}
    />
  );
}
