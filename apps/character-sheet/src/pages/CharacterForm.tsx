import React, { useState, useEffect } from 'react';
import type { Character } from '../types';

interface CharacterFormProps {
  character?: Character;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export default function CharacterForm({
  character,
  onSave,
  onCancel,
}: CharacterFormProps) {
  const [name, setName] = useState(character?.name || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (character) {
      setName(character.name);
    }
  }, [character]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Character name is required');
      return;
    }

    onSave(name.trim());
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{character ? 'Edit Character' : 'Create New Character'}</h1>
        <p>Echo:500 - Character Database Entry</p>
      </header>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Character Name
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter character name..."
              autoFocus
            />
            {error && (
              <p style={{ color: 'var(--color-cyber-accent)', marginTop: 'var(--spacing-sm)' }}>
                {error}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button type="submit" className="btn btn-primary">
              {character ? 'Update' : 'Create'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
