import { deleteCharacter } from '@/entities/character';
import type { Character } from '@/entities/character';

interface UseCharacterListProps {
  characters: Character[];
}

export function useCharacterList({ characters }: UseCharacterListProps) {
  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this character?',
    );
    if (confirmed) {
      deleteCharacter(id);
    }
  };

  return {
    characters,
    handleDelete,
  };
}
