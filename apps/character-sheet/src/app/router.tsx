import { createBrowserRouter } from 'react-router';
import CharacterDetailPage from '../page/character-detail/Page';
import { characterDetailLoader } from '../page/character-detail/loader';
import CharacterFormPage from '../page/character-form/Page';
import { characterFormLoader } from '../page/character-form/loader';
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
    loader: characterFormLoader,
  },
  {
    path: '/character/:id',
    element: <CharacterDetailPage />,
    loader: characterDetailLoader,
  },
]);
