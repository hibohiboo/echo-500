import addonDocs from '@storybook/addon-docs';
import { definePreview } from 'storybook-solidjs-vite';

export default definePreview({
  addons: [addonDocs()],
  parameters: {
    // automatically create action args for all props that start with 'on'
    actions: {
      argTypesRegex: '^on.*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // All components will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
});
