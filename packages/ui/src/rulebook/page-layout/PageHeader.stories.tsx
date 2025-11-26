import { PageHeader } from './PageHeader';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Page Layout/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '戦闘ルール',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '▶',
    title: 'キャラクターの作成',
  },
};

export const BattleCommands: Story = {
  args: {
    icon: '⚔️',
    title: '戦闘用モジュール',
  },
};
