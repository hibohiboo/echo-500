import { TutorialSection } from './TutorialSection';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Shared/UI/TutorialSection',
  component: TutorialSection,
  tags: ['autodocs'],
  argTypes: {
    onContinue: { action: 'continue clicked' },
    showContinueButton: { control: 'boolean' },
    continueButtonText: { control: 'text' },
  },
} satisfies Meta<typeof TutorialSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutButton: Story = {
  args: {
    showContinueButton: false,
    children: (
      <>
        <h2>Echo:500の世界へようこそ</h2>
        <p>
          ここは文明が崩壊してから500年が経過した世界。人造人間たちが廃墟と化した都市を探索する物語が始まります。
        </p>
        <p>
          あなたは<strong>探索者</strong>として、失われた記憶の断片を探し求めています。
        </p>
      </>
    ),
  },
};

export const WithButton: Story = {
  args: {
    showContinueButton: true,
    children: (
      <>
        <h2>TRPGとは？</h2>
        <p>
          <strong>TRPG（テーブルトークRPG）</strong>
          とは、ゲームマスター（GM）と複数のプレイヤー（PL）が、会話を通じて物語を進めていくゲームです。
        </p>
        <p>
          このゲームでは、<code>ダイス</code>を使って行動の成否を判定します。
        </p>
      </>
    ),
  },
};

export const CustomButtonText: Story = {
  args: {
    showContinueButton: true,
    continueButtonText: '次へ進む',
    children: (
      <>
        <h2>キャラクターを作成しよう</h2>
        <p>
          まずは、あなたの分身となる<strong>キャラクター</strong>
          を作成します。
        </p>
        <p>キャラクターには以下の要素があります：</p>
        <ul>
          <li>名前</li>
          <li>能力値（STR, DEX, INTなど）</li>
          <li>技能（調査、戦闘、交渉など）</li>
          <li>背景設定</li>
        </ul>
      </>
    ),
  },
};

export const MultipleSections: Story = {
  render: () => (
    <div style="max-width: 800px; margin: 0 auto;">
      <TutorialSection showContinueButton={false}>
        <h2>第1章：導入</h2>
        <p>
          あなたは古びた研究施設の前に立っています。建物は緑のツタに覆われ、長い時間が経過したことを物語っています。
        </p>
      </TutorialSection>

      <TutorialSection showContinueButton>
        <h2>施設の入り口</h2>
        <p>
          重い金属の扉は半分開いており、中からかすかな機械音が聞こえてきます。
        </p>
        <p>どうしますか？</p>
      </TutorialSection>

      <TutorialSection showContinueButton continueButtonText="中に入る">
        <h2>内部への侵入</h2>
        <p>
          慎重に扉をくぐると、薄暗い廊下が続いています。床には埃が積もり、足跡ひとつありません。
        </p>
      </TutorialSection>
    </div>
  ),
};
