import type { ComponentArgs } from './types';

export const AppContainer = ({ children }: ComponentArgs) => (
  <div
    // className="max-w-(--content-max-width) mx-auto p-(--spacing-xl)"
    className="app-container"
  >
    {children}
  </div>
);
