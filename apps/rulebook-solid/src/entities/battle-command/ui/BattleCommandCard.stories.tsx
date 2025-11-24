import { BattleCommandCard } from './BattleCommandCard';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Entities/BattleCommand/BattleCommandCard',
  component: BattleCommandCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    cp: { control: 'number' },
  },
} satisfies Meta<typeof BattleCommandCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '斬撃',
    cp: 1,
    timing: 'メインプロセス',
    target: '敵単体',
    range: '近接',
    cost: 'なし',
    effect: '対象に2D6+【筋力】のダメージを与える。',
    flavor: '刃を振るい、敵を切り裂く。',
    tags: ['攻撃', '近接'],
    details: '',
  },
};

export const WithDetails: Story = {
  args: {
    name: '渾身の一撃',
    cp: 2,
    timing: 'メインプロセス',
    target: '敵単体',
    range: '近接',
    cost: 'HP 5',
    effect: '対象に3D6+【筋力】×2のダメージを与える。クリティカル率+10%。',
    flavor: '全力を込めた一撃が、敵を粉砕する。',
    tags: ['攻撃', '近接', '高威力'],
    details:
      'このコマンドは使用後、次のターン終了時まで【回避】判定に-2のペナルティを受ける。\n\nクリティカル発生時、追加で1D6のダメージを与える。\n\n消費したHPは戦闘終了後に自動的に回復する。',
  },
};

export const SupportCommand: Story = {
  args: {
    name: '回復',
    cp: 2,
    timing: 'メインプロセス',
    target: '味方単体',
    range: '近接',
    cost: 'MP 10',
    effect: '対象のHPを2D6+【知力】回復する。',
    flavor: '優しい光が傷を癒やす。',
    tags: ['回復', 'サポート'],
    details:
      '対象の最大HPを超えて回復することはできない。\n\n自分自身を対象にすることも可能。',
  },
};

export const RangeCommand: Story = {
  args: {
    name: '狙撃',
    cp: 2,
    timing: 'メインプロセス',
    target: '敵単体',
    range: '遠隔',
    cost: 'なし',
    effect: '対象に2D6+【器用】のダメージを与える。命中判定に+2のボーナス。',
    flavor: '照準を合わせ、確実に撃ち抜く。',
    tags: ['攻撃', '遠隔', '命中補正'],
    details:
      '遠隔攻撃のため、近接戦闘中でもペナルティを受けない。\n\nクリティカル発生時、対象を1ターン行動不能にする。',
  },
};

export const DefenseCommand: Story = {
  args: {
    name: '防御',
    cp: 1,
    timing: 'リアクション',
    target: '自分',
    range: '-',
    cost: 'なし',
    effect: '次に受けるダメージを半減する。',
    flavor: '身構えて、衝撃に備える。',
    tags: ['防御', 'リアクション'],
    details:
      'このコマンドは敵の攻撃宣言後、ダメージ算出前に使用できる。\n\n防御後、次のターンの行動順が最後になる。',
  },
};

export const NoFlavor: Story = {
  args: {
    name: 'カウンター',
    cp: 3,
    timing: 'リアクション',
    target: '攻撃してきた敵',
    range: '近接',
    cost: 'HP 3',
    effect:
      '敵の攻撃を無効化し、対象に【筋力】+【器用】のダメージを与える。',
    tags: ['反撃', 'リアクション', '近接'],
    details: '近接攻撃を受けた時のみ使用可能。遠隔攻撃には使用できない。',
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        'grid-template-columns': 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        background: 'rgba(13, 13, 13, 0.95)',
      }}
    >
      <BattleCommandCard
        name="斬撃"
        cp={1}
        timing="メインプロセス"
        target="敵単体"
        range="近接"
        cost="なし"
        effect="対象に2D6+【筋力】のダメージを与える。"
        flavor="刃を振るい、敵を切り裂く。"
        tags={['攻撃', '近接']}
        details=""
      />
      <BattleCommandCard
        name="回復"
        cp={2}
        timing="メインプロセス"
        target="味方単体"
        range="近接"
        cost="MP 10"
        effect="対象のHPを2D6+【知力】回復する。"
        flavor="優しい光が傷を癒やす。"
        tags={['回復', 'サポート']}
        details="対象の最大HPを超えて回復することはできない。\n\n自分自身を対象にすることも可能。"
      />
      <BattleCommandCard
        name="防御"
        cp={1}
        timing="リアクション"
        target="自分"
        range="-"
        cost="なし"
        effect="次に受けるダメージを半減する。"
        flavor="身構えて、衝撃に備える。"
        tags={['防御', 'リアクション']}
        details="このコマンドは敵の攻撃宣言後、ダメージ算出前に使用できる。\n\n防御後、次のターンの行動順が最後になる。"
      />
      <BattleCommandCard
        name="渾身の一撃"
        cp={2}
        timing="メインプロセス"
        target="敵単体"
        range="近接"
        cost="HP 5"
        effect="対象に3D6+【筋力】×2のダメージを与える。クリティカル率+10%。"
        flavor="全力を込めた一撃が、敵を粉砕する。"
        tags={['攻撃', '近接', '高威力']}
        details="このコマンドは使用後、次のターン終了時まで【回避】判定に-2のペナルティを受ける。\n\nクリティカル発生時、追加で1D6のダメージを与える。\n\n消費したHPは戦闘終了後に自動的に回復する。"
      />
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    name: '魔法陣展開：炎帝の裁き',
    cp: 5,
    timing: 'セットアッププロセス',
    target: '戦闘エリア全体',
    range: '視界内',
    cost: 'MP 30, HP 10',
    effect:
      '3ターンの間、戦闘エリア全体に炎の魔法陣を展開する。毎ターン開始時、敵全体に1D6の火炎ダメージを与える。味方は火炎耐性+20%を得る。',
    flavor:
      '古代の言語で紡がれる詠唱が、戦場を炎で包む。これは破壊と再生の力、終焉と始まりの証。',
    tags: [
      '魔法',
      '範囲攻撃',
      'バフ',
      '継続効果',
      '火炎属性',
      '高コスト',
      '上級',
    ],
    details:
      '【使用条件】\n- 【知力】が15以上必要\n- 魔法陣系スキルを1つ以上習得していること\n\n【詳細効果】\n1. 展開時、敵全体に2D6の火炎ダメージ\n2. 毎ターン開始時、敵全体に1D6の火炎ダメージ（3ターン継続）\n3. 味方全員の火炎耐性+20%（3ターン継続）\n4. 魔法陣内で使用する火炎系コマンドの威力+50%\n\n【注意事項】\n- このコマンド使用中、他の魔法陣系コマンドは使用できない\n- 展開中にMPが0になると効果は即座に解除される\n- 戦闘エリアから離脱すると効果は解除される\n\n【コンボ推奨】\n- 炎の矢、炎の壁、火炎放射などの火炎系コマンドと組み合わせることで真価を発揮\n- パーティに水属性ユニットがいる場合、効果が相殺される可能性あり',
  },
};
