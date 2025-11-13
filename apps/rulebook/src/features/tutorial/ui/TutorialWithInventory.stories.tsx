import { TutorialWithInventory } from './TutorialWithInventory';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Features/Tutorial/With Inventory System',
  component: TutorialWithInventory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TutorialWithInventory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
