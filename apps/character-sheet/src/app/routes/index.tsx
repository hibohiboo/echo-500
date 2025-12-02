import { createBrowserRouter } from 'react-router';
import { CharacterCreatePage } from '@/pages/character-create';
import {
  createCharacterDetailLoader,
  CharacterDetailPage,
} from '@/pages/character-detail';
import {
  createCharacterEditLoader,
  CharacterEditPage,
} from '@/pages/character-edit';
import { CharacterListPage } from '@/pages/character-list';
import { createCharacterListLoader } from '@/pages/character-list/loader';
import { PlayerCharacterPage } from '@/pages/player-character';

export const createRouter = ({ dispatch }: { dispatch: AppDispatch }) =>
  createBrowserRouter(
    [
      {
        path: '/',
        element: <CharacterListPage />,
        loader: createCharacterListLoader(dispatch),
      },
      {
        path: '/create',
        element: <CharacterCreatePage />,
      },
      {
        path: '/character/:id',
        element: <CharacterDetailPage />,
        loader: createCharacterDetailLoader(dispatch),
      },
      {
        path: '/edit/:id',
        element: <CharacterEditPage />,
        loader: createCharacterEditLoader(dispatch),
      },
      {
        path: '/player-character',
        element: <PlayerCharacterPage />,
      },
    ],
    { basename: BASE_PATH },
  );
