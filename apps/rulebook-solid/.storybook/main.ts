import { defineMain } from 'storybook-solidjs-vite';

export default defineMain({
  framework: {
    name: 'storybook-solidjs-vite',
    options: {
      // docgen: {
      // Enabled by default, but you can configure or disable it:
      //  see https://github.com/styleguidist/react-docgen-typescript#options
      // },
    },
  },
  addons: [],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
});
