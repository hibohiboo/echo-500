import { ContentCard, SectionTitle } from './ContentCard';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Page Layout/ContentCard',
  component: ContentCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <SectionTitle icon="◆">初期メモリーの確認</SectionTitle>
        <p className="text-text-secondary leading-relaxed mb-4">
          すべての人造人間は、作成時点で以下の初期メモリーを所持している。
        </p>
      </>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    children: (
      <>
        <SectionTitle>名前を決める</SectionTitle>
        <p className="text-text-secondary leading-relaxed">
          最後にキャラクターの名前を決める。
        </p>
      </>
    ),
  },
};
