import { useDeletePlayerCharacter } from '@/entities/playerCharacter';
import type { CharacterListItem } from '@/feature/characterManagement/ui/CharacterListView';

interface UseCharacterListProps {
  characters: CharacterListItem[];
}

export function useCharacterList({ characters }: UseCharacterListProps) {
  const { handleDelete } = useDeletePlayerCharacter();

  return {
    characters,
    handleDelete,
  };
}
