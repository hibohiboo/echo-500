import { IntroCard } from './IntroCard';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Page Layout/IntroCard',
  component: IntroCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IntroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <p>Echo:500の戦闘は、カウンターボードとエリアマップを使用する。</p>
      </>
    ),
  },
};

export const MultiParagraph: Story = {
  args: {
    children: (
      <>
        <p>
          <strong>戦闘モジュール</strong>
          は、戦闘中に使用できる特殊なアクションです。 各モジュールには
          <strong>CP(コストポイント)</strong>
          が設定されており、キャラクター作成時にCPを消費して取得できます。
        </p>
        <p>
          戦闘スタイル(セイバー、ガンナー、ウィザード)に応じて、
          対応するタグを持つモジュールが使用可能になります。
        </p>
      </>
    ),
  },
};
