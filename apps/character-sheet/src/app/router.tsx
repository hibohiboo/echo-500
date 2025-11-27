import { createBrowserRouter } from 'react-router';
import CharacterDetailPage from '../page/character-detail/Page';
import { characterDetailLoader } from '../page/character-detail/loader';
import CharacterFormPage from '../page/character-form/Page';
import { characterFormLoader } from '../page/character-form/loader';
import CharacterListPage from '../page/character-list/Page';
import { characterListLoader } from '../page/character-list/loader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CharacterListPage />,
    loader: characterListLoader,
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
