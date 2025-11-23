import customConfig from '@echo-500/eslint-config-custom/frontend.js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{ts}'],
    extends: [...customConfig],
  },
]);
