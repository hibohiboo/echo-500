import { createBrowserRouter } from 'react-router';
import CharacterDetailPage from '../page/character-detail/Page';
import CharacterFormPage from '../page/character-form/Page';
import CharacterListPage from '../page/character-list/Page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CharacterListPage />,
  },
  {
    path: '/new',
    element: <CharacterFormPage />,
  },
  {
    path: '/edit/:id',
    element: <CharacterFormPage />,
  },
  {
    path: '/character/:id',
    element: <CharacterDetailPage />,
  },
]);
