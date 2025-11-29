import { Layout } from './Layout';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    basePath: 'rulebook',
    children: <></>,
  },
};

export const WithContent: Story = {
  args: {
    basePath: 'rulebook',
    children: (
      <div style={{ padding: '2rem' }}>
        <h1>Sample Content</h1>
        <p>
          This is sample content inside the layout. The layout includes header,
          footer, and background effects.
        </p>
      </div>
    ),
  },
};
