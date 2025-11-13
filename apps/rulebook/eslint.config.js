// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import customConfig from '@trpg-scenario-maker/eslint-config-custom/frontend.js';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'vite.config.ts', 'playwright.config.ts', 'tests/**']),
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [...customConfig],
    rules: {
      'import/no-absolute-path': ['off'],
      'import/no-unresolved': ['warn'],
    },
  },
  {
    files: ['src/**/*.stories.tsx', '.storybook/**/*'],
    extends: [storybook.configs['flat/recommended']],
    rules: {
      'no-shadow': ['off'],
      'import/no-extraneous-dependencies': ['off'],
      'no-underscore-dangle': ['off'],
    },
  },
]);
