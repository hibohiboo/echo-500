import { ItemToast } from './ItemToast';
import type { InventoryItem } from '../inventory-panel';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Shared/UI/ItemToast',
  component: ItemToast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ItemToast>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonItem: InventoryItem = {
  id: 'item-common',
  type: 'item',
  name: '古びた鍵',
  icon: '🔑',
  rarity: 'common',
  description: '錆びた鍵。どこかの扉を開けられるかもしれない。',
};

const rareItem: InventoryItem = {
  id: 'item-rare',
  type: 'item',
  name: '探索者のメモ',
  icon: '📝',
  rarity: 'rare',
  description: '第7研究所についての手書きのメモ。',
};

const epicItem: InventoryItem = {
  id: 'mem-epic',
  type: 'memory',
  name: '音の記録',
  icon: '💾',
  rarity: 'epic',
  description: '施設から聞こえる機械音を記録したメモリチップ。',
};

const legendaryItem: InventoryItem = {
  id: 'cmd-legendary',
  type: 'command',
  name: '時間停止',
  icon: '⏸️',
  rarity: 'legendary',
  description: '周囲の時間を一時的に停止させる強力なコマンド。',
};

export const Common: Story = {
  args: {
    item: commonItem,
    onAnimationEnd: () => console.log('Toast animation ended'),
  },
};

export const Rare: Story = {
  args: {
    item: rareItem,
    onAnimationEnd: () => console.log('Toast animation ended'),
  },
};

export const Epic: Story = {
  args: {
    item: epicItem,
    onAnimationEnd: () => console.log('Toast animation ended'),
  },
};

export const Legendary: Story = {
  args: {
    item: legendaryItem,
    onAnimationEnd: () => console.log('Toast animation ended'),
  },
};
