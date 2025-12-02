import { CharacterDetailView } from '@/feature/characterManagement';
import { useDetailPage } from '../hooks/useDetailPage';

export default function CharacterDetailPage() {
  const { onDelete, onEdit, detailState, onBack } = useDetailPage();

  return (
    <CharacterDetailView
      {...detailState}
      onEdit={onEdit}
      onDelete={onDelete}
      onBack={onBack}
    />
  );
}
