import { ModifierBanner } from './ModifierBanner';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Battle Frame/ModifierBanner',
  component: ModifierBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModifierBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoModifiers: Story = {
  args: {
    modifiers: { movement: 0, evasion: 0 },
  },
};

export const MovementOnly: Story = {
  args: {
    modifiers: { movement: 1, evasion: 0 },
  },
};

export const EvasionOnly: Story = {
  args: {
    modifiers: { movement: 0, evasion: 1 },
  },
};

export const Both: Story = {
  args: {
    modifiers: { movement: 1, evasion: -1 },
  },
};
