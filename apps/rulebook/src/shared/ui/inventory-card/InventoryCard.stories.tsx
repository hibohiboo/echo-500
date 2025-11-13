import { InventoryCard } from './InventoryCard';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Shared/UI/InventoryCard',
  component: InventoryCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    type: {
      control: 'select',
      options: ['command', 'item', 'memory'],
    },
    rarity: {
      control: 'select',
      options: ['common', 'rare', 'epic', 'legendary'],
    },
  },
} satisfies Meta<typeof InventoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommandCard: Story = {
  args: {
    type: 'command',
    name: '調査',
    icon: '🔍',
    rarity: 'common',
  },
};

export const ItemCard: Story = {
  args: {
    type: 'item',
    name: '探索者のメモ',
    icon: '📝',
    rarity: 'rare',
  },
};

export const MemoryChip: Story = {
  args: {
    type: 'memory',
    name: '音の記録',
    icon: '💾',
    rarity: 'epic',
  },
};

export const LegendaryItem: Story = {
  args: {
    type: 'item',
    name: '古代のキー',
    icon: '🔑',
    rarity: 'legendary',
  },
};

export const CardGrid: Story = {
  render: () => (
    <div
      style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; padding: 1rem; max-width: 800px;"
    >
      <InventoryCard type="command" name="調査" icon="🔍" rarity="common" />
      <InventoryCard type="command" name="聞き耳" icon="👂" rarity="common" />
      <InventoryCard type="command" name="戦闘" icon="⚔️" rarity="rare" />
      <InventoryCard
        type="item"
        name="探索者のメモ"
        icon="📝"
        rarity="rare"
      />
      <InventoryCard type="item" name="医療キット" icon="💊" rarity="common" />
      <InventoryCard
        type="memory"
        name="音の記録"
        icon="💾"
        rarity="epic"
      />
      <InventoryCard
        type="memory"
        name="過去の映像"
        icon="📹"
        rarity="epic"
      />
      <InventoryCard
        type="item"
        name="古代のキー"
        icon="🔑"
        rarity="legendary"
      />
    </div>
  ),
};
