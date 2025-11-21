import { useState } from 'react';
import CharacterForm from './pages/CharacterForm';
import CharacterList from './pages/CharacterList';
import {
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacter,
} from './store/mockBackend';
import type { Character } from './types';

type View = 'list' | 'create' | 'edit';

function App() {
  const [view, setView] = useState<View>('list');
  const [characters, setCharacters] = useState<Character[]>(() => getCharacters());
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadCharacters = () => {
    setCharacters(getCharacters());
  };

  const handleCreateNew = () => {
    setView('create');
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setView('edit');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      deleteCharacter(id);
      loadCharacters();
    }
  };

  const handleSave = (name: string) => {
    if (view === 'create') {
      createCharacter(name);
    } else if (view === 'edit' && editingId) {
      updateCharacter(editingId, name);
    }
    setView('list');
    setEditingId(null);
    loadCharacters();
  };

  const handleCancel = () => {
    setView('list');
    setEditingId(null);
  };

  const editingCharacter = editingId ? getCharacter(editingId) : undefined;

  return (
    <>
      {view === 'list' && (
        <CharacterList
          characters={characters}
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {(view === 'create' || view === 'edit') && (
        <CharacterForm
          character={editingCharacter}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default App;
