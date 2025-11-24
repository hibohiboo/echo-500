import { ItemDetail } from './ItemDetail';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Shared/UI/ItemDetail',
  component: ItemDetail,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    type: {
      control: 'select',
      options: ['command', 'item', 'memory'],
    },
    rarity: {
      control: 'select',
      options: ['common', 'rare', 'epic', 'legendary'],
    },
  },
} satisfies Meta<typeof ItemDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommandDetail: Story = {
  args: {
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
        <p>
          <strong>使用回数:</strong> 制限なし
        </p>
      </>
    ),
  },
};

export const ItemDetail_: Story = {
  args: {
    type: 'item',
    name: '探索者のメモ',
    icon: '📝',
    rarity: 'rare',
    description: '第7研究所についての手書きのメモ。誰かが残したもののようだ。',
    details: (
      <>
        <p>メモには以下のような内容が記されている：</p>
        <p>
          「第7研究所は人造人間の製造施設だった。しかし500年前の
          <strong>大災厄</strong>により全てが停止した。
          中央制御室には重要なデータが残されているはずだ。」
        </p>
        <p>このメモは、施設内部の構造を理解する手がかりになりそうだ。</p>
      </>
    ),
  },
};

export const MemoryChipDetail: Story = {
  args: {
    type: 'memory',
    name: '音の記録',
    icon: '💾',
    rarity: 'epic',
    description:
      '施設から聞こえる機械音を記録したメモリチップ。解析することで何かがわかるかもしれない。',
    details: (
      <>
        <p>音声解析の結果、以下の情報が判明した：</p>
        <ul>
          <li>音源は地下3階から発生している</li>
          <li>
            音の周波数から、<strong>冷却システム</strong>が稼働中と推測される
          </li>
          <li>
            定期的なビープ音は、何らかのプロセスが実行中であることを示している
          </li>
        </ul>
        <p>施設の一部が今も稼働している可能性が高い。慎重に進む必要がある。</p>
      </>
    ),
  },
};

export const LegendaryItemDetail: Story = {
  args: {
    type: 'item',
    name: '古代のキー',
    icon: '🔑',
    rarity: 'legendary',
    description:
      '複雑な回路が組み込まれた特殊なキー。未知の技術で作られている。',
    details: (
      <>
        <p>
          このキーは<strong>旧文明の最高技術</strong>
          で作られており、特定の扉やシステムを起動できる。
        </p>
        <p>
          キー表面には微細な回路パターンが刻まれており、触れると
          <strong>淡い光</strong>を発する。
        </p>
        <p>
          <strong>特殊能力:</strong>
        </p>
        <ul>
          <li>封印された扉を開錠できる</li>
          <li>古代のシステムにアクセスできる</li>
          <li>所持者の記憶を一時的に回復させることがある</li>
        </ul>
        <p style="color: #ffd700; text-shadow: 0 0 10px #ffd700;">
          ※このアイテムは物語の核心に関わる重要なキーアイテムです
        </p>
      </>
    ),
  },
};
