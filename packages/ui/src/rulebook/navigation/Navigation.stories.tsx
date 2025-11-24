import { Navigation } from './Navigation';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Navigation',
  component: Navigation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    basePath: 'rulebook',
  },
};

export const NoBasePath: Story = {
  args: {},
};
