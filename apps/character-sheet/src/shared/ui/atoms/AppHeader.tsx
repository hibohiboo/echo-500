import type { ComponentArgs } from './types';

export const AppHeader = ({ children }: ComponentArgs) => (
  <header
    // className="text-center mb-[var(--spacing-2xl)] py-[var(--spacing-xl)] border-b-[var(--border-cyber)]"
    className="app-header"
  >
    <h1>{children}</h1>
  </header>
);
