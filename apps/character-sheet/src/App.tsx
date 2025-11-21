import { useState } from 'react';
import CharacterDetail from './pages/CharacterDetail';
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

type View = 'list' | 'create' | 'edit' | 'detail';

function App() {
  const [view, setView] = useState<View>('list');
  const [characters, setCharacters] = useState<Character[]>(() =>
    getCharacters(),
  );
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadCharacters = () => {
    setCharacters(getCharacters());
  };

  const handleCreateNew = () => {
    setView('create');
  };

  const handleViewDetail = (id: string) => {
    setEditingId(id);
    setView('detail');
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setView('edit');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      deleteCharacter(id);
      loadCharacters();
      if (view === 'detail') {
        setView('list');
        setEditingId(null);
      }
    }
  };

  const handleBack = () => {
    setView('list');
    setEditingId(null);
  };

  const handleSave = (character: Omit<Character, 'id'>) => {
    if (view === 'create') {
      createCharacter(character);
    } else if (view === 'edit' && editingId) {
      updateCharacter(editingId, character);
    }
    loadCharacters();
    setView('list');
    setEditingId(null);
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
          onViewDetail={handleViewDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {view === 'detail' && editingCharacter && (
        <CharacterDetail
          character={editingCharacter}
          onEdit={() => handleEdit(editingCharacter.id)}
          onDelete={() => handleDelete(editingCharacter.id)}
          onBack={handleBack}
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
