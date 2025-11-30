import { AppContainer } from '@/shared/ui/atoms/AppContainer';
import { AppHeader } from '@/shared/ui/atoms/AppHeader';
import { useCharacterForm } from '../hook/useCharacterForm';
import { InputForm } from './InputForm';

export default function CharacterCreatePage() {
  const { handleSubmit, onCancel } = useCharacterForm();
  return (
    <AppContainer>
      <AppHeader>Create new chracater</AppHeader>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <InputForm
            id="name"
            type="text"
            className="form-input"
            label="CHARACTER NAME"
            placeholder="Enter character name..."
            autoFocus
            required
          />
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
