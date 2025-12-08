import { useNavigate, useLoaderData, useRevalidator } from 'react-router';
import { useCharacterList } from '../hooks/useCharacterList';
import CharacterListView from './ListView';
import type { CharacterListItem } from './ListView';

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
