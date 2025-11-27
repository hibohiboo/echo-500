import { useNavigate } from 'react-router';
import {
  useCharacterList,
  CharacterListView,
} from '@/feature/characterManagement';

export default function CharacterListPage() {
  const navigate = useNavigate();
  const { characters, handleDelete, reloadCharacters } = useCharacterList();

  return (
    <CharacterListView
      characters={characters}
      onCreateNew={() => navigate('/new')}
      onViewDetail={(id) => navigate(`/character/${id}`)}
      onEdit={(id) => navigate(`/edit/${id}`)}
      onDelete={async (id) => {
        await handleDelete(id);
        reloadCharacters();
      }}
    />
  );
}
