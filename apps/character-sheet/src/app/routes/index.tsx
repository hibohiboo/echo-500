import { createBrowserRouter } from 'react-router';
import CharacterDetailPage from '@/page/character-detail/Page';
import { characterDetailLoader } from '@/page/character-detail/loader';
import CharacterFormPage from '@/page/character-form/Page';
import { characterFormLoader } from '@/page/character-form/loader';
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
        path: '/edit/:id',
        element: <CharacterFormPage />,
        loader: characterFormLoader,
      },
      {
        path: '/character/:id',
        element: <CharacterDetailPage />,
        loader: characterDetailLoader,
      },
      {
        path: '/player-character',
        element: <PlayerCharacterPage />,
      },
    ],
    { basename: BASE_PATH },
  );
