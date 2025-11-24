import { CommandCard } from './CommandCard';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/CommandCard',
  component: CommandCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommandCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'スキャン',
    description: '周囲の環境をスキャンし、隠された情報を明らかにする。',
  },
};

export const Selected: Story = {
  args: {
    title: '移動',
    description: '指定した場所へ移動する。',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    title: '戦闘',
    description: '敵と戦闘を開始する。使用不可。',
    disabled: true,
  },
};

export const WithCallback: Story = {
  args: {
    title: '調査',
    description: '対象を詳しく調査する。',
    onClick: () => alert('調査コマンドが実行されました'),
  },
};
