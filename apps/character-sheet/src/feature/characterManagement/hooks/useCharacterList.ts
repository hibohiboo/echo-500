import { useEffect, useState } from 'react';
import { getCharacters, deleteCharacter } from '@/entities/character';
import type { Character } from '@/entities/character';

export function useCharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const loadCharacters = () => {
    const loadedCharacters = getCharacters();
    setCharacters(loadedCharacters);
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this character?',
    );
    if (confirmed) {
      deleteCharacter(id);
      loadCharacters();
    }
  };

  return {
    characters,
    handleDelete,
    reloadCharacters: loadCharacters,
  };
}
