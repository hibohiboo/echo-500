import { StatCard } from './StatCard';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Battle Frame/StatCard',
  component: StatCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HP: Story = {
  args: {
    label: 'HP (ヒットポイント)',
    value: 20,
    description: '0になると戦闘不能',
  },
};

export const EvasionWithModifier: Story = {
  args: {
    label: '回避値',
    value: 6,
    description: '2d6がこの値未満なら攻撃失敗',
    modifier: 1,
    baseValue: 5,
  },
};

export const MovementWithModifier: Story = {
  args: {
    label: '移動力',
    value: 4,
    description: '1ターンに移動できるマス数',
    modifier: 1,
    baseValue: 3,
  },
};

export const Size: Story = {
  args: {
    label: 'サイズ',
    value: '1x1',
    description: '占有マスの大きさ',
  },
};
