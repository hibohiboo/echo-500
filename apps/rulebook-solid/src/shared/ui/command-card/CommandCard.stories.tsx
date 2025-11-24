import { CommandCard } from './CommandCard';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Shared/UI/CommandCard',
  component: CommandCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
} satisfies Meta<typeof CommandCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '調査する',
    description: '周囲を詳しく調べて、手がかりを探します。',
  },
};

export const Selected: Story = {
  args: {
    title: '話しかける',
    description: 'NPCに話しかけて、情報を聞き出します。',
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    title: '戦う',
    description: '敵と戦闘を開始します。（条件未達成）',
    disabled: true,
  },
};

export const LongDescription: Story = {
  args: {
    title: '魔法を使う',
    description:
      'あなたは古代の呪文を唱え、周囲の空間を歪ませる。この行動には大きなリスクが伴うが、状況を一変させる力を持っている。正気度判定が必要になります。',
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; padding: 1rem;">
      <CommandCard
        title="観察する"
        description="じっくりと周囲を観察します。"
        onClick={() => console.log('観察する')}
      />
      <CommandCard
        title="聞き耳を立てる"
        description="静かに耳を澄まして音を聞きます。"
        onClick={() => console.log('聞き耳を立てる')}
      />
      <CommandCard
        title="隠れる"
        description="物陰に身を隠します。"
        onClick={() => console.log('隠れる')}
        selected
      />
      <CommandCard
        title="逃げる"
        description="その場から全力で逃走します。"
        onClick={() => console.log('逃げる')}
        disabled
      />
    </div>
  ),
};
