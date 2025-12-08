import { useDeletePlayerCharacter } from '@/entities/playerCharacter';
import type { CharacterListItem } from '../ui/ListView';

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
