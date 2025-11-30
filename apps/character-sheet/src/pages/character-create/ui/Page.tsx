import { AppContainer } from '@/shared/ui/atoms/AppContainer';
import { AppHeader } from '@/shared/ui/atoms/AppHeader';
import { useCharacterForm } from '../hook/useCharacterForm';
import { InputForm } from './InputForm';

export default function CharacterCreatePage() {
  const { name, isSubmitting, handleSubmit, onCancel, handleNameChange } =
    useCharacterForm();
  return (
    <AppContainer>
      <AppHeader>Create new chracater</AppHeader>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <InputForm
              id="name"
              type="text"
              className="form-input"
              label="CHARACTER NAME"
              placeholder="Enter character name..."
              value={name}
              onChange={handleNameChange}
              autoFocus
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AppContainer>
  );
}
