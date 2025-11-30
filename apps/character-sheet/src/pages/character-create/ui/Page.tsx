import { useCharacterForm } from '../hook/useCharacterForm';
import type { ReactNode } from 'react';

type ComponentArgs = { children: ReactNode };
const AppContainer = ({ children }: ComponentArgs) => (
  <div
    // className="max-w-(--content-max-width) mx-auto p-(--spacing-xl)"
    className="app-container"
  >
    {children}
  </div>
);

const AppHeader = ({ children }: ComponentArgs) => (
  <header
    // className="text-center mb-[var(--spacing-2xl)] py-[var(--spacing-xl)] border-b-[var(--border-cyber)]"
    className="app-header"
  >
    <h1>{children}</h1>
  </header>
);

export default function CharacterCreatePage() {
  const { handleSubmit, onCancel } = useCharacterForm();
  return (
    <AppContainer>
      <AppHeader>Create new chracater</AppHeader>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label ">
              Character Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              placeholder="Enter character name..."
              autoFocus
              required
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AppContainer>
  );
}
