import { createBrowserRouter } from 'react-router';
import CharacterFormPage from '@/page/character-form/Page';
import { characterFormLoader } from '@/page/character-form/loader';
import { CharacterCreatePage } from '@/pages/character-create';
import {
  createCharacterDetailLoader,
  CharacterDetailPage,
} from '@/pages/character-detail';
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
        path: '/new',
        element: <CharacterFormPage />,
      },
      {
        path: '/create',
        element: <CharacterCreatePage />,
      },
      {
        path: '/edit/:id',
        element: <CharacterFormPage />,
        loader: characterFormLoader,
      },
      {
        path: '/character/:id',
        element: <CharacterDetailPage />,
        loader: createCharacterDetailLoader(dispatch),
      },
      {
        path: '/player-character',
        element: <PlayerCharacterPage />,
      },
    ],
    { basename: BASE_PATH },
  );
