import { BattleCommandCardList } from './BattleCommandCardList';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Entities/BattleCommand/BattleCommandCardList',
  component: BattleCommandCardList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BattleCommandCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ background: 'rgba(13, 13, 13, 0.95)', 'min-height': '100vh' }}>
      <BattleCommandCardList />
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div
      style={{
        background:
          'linear-gradient(180deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.8) 100%)',
        'min-height': '100vh',
        padding: '2rem',
      }}
    >
      <BattleCommandCardList />
    </div>
  ),
};
