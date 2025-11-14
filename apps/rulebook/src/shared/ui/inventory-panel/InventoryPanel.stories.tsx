import { createSignal } from 'solid-js';
import { InventoryPanel } from './InventoryPanel';
import type { InventoryItem } from './InventoryPanel';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const sampleItems: InventoryItem[] = [
  {
    id: '1',
    type: 'command',
    name: '調査',
    icon: '🔍',
    rarity: 'common',
    description: '周囲を詳しく調べて、手がかりを探します。',
    details: (
      <>
        <p>
          <strong>効果:</strong>
          目標値以下でダイスを振ることで、隠された情報や手がかりを発見できます。
        </p>
        <p>
          <strong>判定:</strong> INT × 5 または 調査技能
        </p>
      </>
    ),
  },
  {
    id: '2',
    type: 'command',
    name: '聞き耳',
    icon: '👂',
    rarity: 'common',
    description: '耳を澄まして、周囲の音を聞き取ります。',
    details: <p>小さな音や遠くの音も聞き取れる可能性があります。</p>,
  },
  {
    id: '3',
    type: 'command',
    name: '戦闘',
    icon: '⚔️',
    rarity: 'rare',
    description: '敵と戦闘を開始します。',
    details: <p>STRまたはDEXを使用して戦闘判定を行います。</p>,
  },
  {
    id: '4',
    type: 'item',
    name: '探索者のメモ',
    icon: '📝',
    rarity: 'rare',
    description: '第7研究所についての手書きのメモ。',
    details: (
      <p>
        「第7研究所は人造人間の製造施設だった。中央制御室には重要なデータが残されているはずだ。」
      </p>
    ),
  },
  {
    id: '5',
    type: 'item',
    name: '医療キット',
    icon: '💊',
    rarity: 'common',
    description: '基本的な医療用品が入ったキット。',
    details: <p>HPを1D6回復します。</p>,
  },
  {
    id: '6',
    type: 'memory',
    name: '音の記録',
    icon: '💾',
    rarity: 'epic',
    description: '施設から聞こえる機械音を記録したメモリチップ。',
    details: (
      <p>音源は地下3階から発生している。冷却システムが稼働中と推測される。</p>
    ),
  },
  {
    id: '7',
    type: 'memory',
    name: '過去の映像',
    icon: '📹',
    rarity: 'epic',
    description: '500年前の映像が記録されたメモリチップ。',
    details: (
      <p>
        大災厄の瞬間が記録されている。真実を知る手がかりになるかもしれない。
      </p>
    ),
  },
  {
    id: '8',
    type: 'item',
    name: '古代のキー',
    icon: '🔑',
    rarity: 'legendary',
    description: '複雑な回路が組み込まれた特殊なキー。',
    details: (
      <>
        <p>封印された扉を開錠できる。古代のシステムにアクセスできる。</p>
        <p style="color: #ffd700;">※物語の核心に関わる重要なキーアイテム</p>
      </>
    ),
  },
];

function InteractiveInventory() {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div style="min-height: 100vh; padding: 2rem; position: relative;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h1 style="color: var(--color-cyber-primary); margin-bottom: 2rem;">
          インベントリシステムのデモ
        </h1>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
          下のボタンをクリックしてインベントリパネルを開いてください。
          カードをクリックすると詳細が表示されます。
        </p>

        <button
          onClick={() => setIsOpen(true)}
          style="
            font-family: var(--font-heading);
            font-size: 1.2rem;
            padding: 1rem 2rem;
            background: transparent;
            border: 2px solid var(--color-cyber-primary);
            color: var(--color-cyber-primary);
            cursor: pointer;
            transition: all 0.3s;
          "
        >
          📦 インベントリを開く
        </button>
      </div>

      <InventoryPanel
        isOpen={isOpen()}
        items={sampleItems}
        onClose={() => setIsOpen(false)}
        onExecute={() => {}}
      />
    </div>
  );
}

const meta = {
  title: 'Shared/UI/InventoryPanel',
  component: InteractiveInventory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InteractiveInventory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
