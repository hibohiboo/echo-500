import addonDocs from '@storybook/addon-docs';
import { definePreview } from 'storybook-solidjs-vite';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import '../src/styles/theme.css';

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
    backgrounds: {
      default: 'dark',
      options: {
        dark: { name: 'dark', value: '#0d0d0d' },
        light: { name: 'light', value: '#ffffff' },
      },
    },
  },
  // All components will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
});
