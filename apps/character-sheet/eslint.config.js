import customConfig from '@echo-500/eslint-config-custom/frontend.js';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'vite.config.ts', 'tests/**']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...customConfig],
  },
]);
