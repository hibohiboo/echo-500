import { useMemo } from 'react';
import { RouterProvider } from 'react-router';
import { createRouter } from './routes';

function Router() {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
}

export default Router;
