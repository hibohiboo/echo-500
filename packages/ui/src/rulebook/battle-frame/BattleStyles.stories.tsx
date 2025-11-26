import { BattleStyles } from './BattleStyles';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Battle Frame/BattleStyles',
  component: BattleStyles,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BattleStyles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Saber: Story = {
  args: {
    battleStyles: [
      {
        name: 'セイバー',
        description:
          '近接戦闘を主とするスタイル。接近して敵を制圧する戦術に長ける。',
        cpCost: 30,
        modifier: { movement: 1 },
      },
    ],
  },
};

export const Wizard: Story = {
  args: {
    battleStyles: [
      {
        name: 'ウィザード',
        description:
          '支援と妨害を主とするスタイル。味方の強化や敵の弱体化を行う。',
        cpCost: 30,
        modifier: { movement: -1, evasion: -1 },
      },
    ],
  },
};

export const Multiple: Story = {
  args: {
    battleStyles: [
      {
        name: 'セイバー',
        description:
          '近接戦闘を主とするスタイル。接近して敵を制圧する戦術に長ける。',
        cpCost: 30,
        modifier: { movement: 1 },
      },
      {
        name: 'ガンナー',
        description:
          '遠距離攻撃を主とするスタイル。安全な距離から敵を攻撃する。',
        cpCost: 30,
        modifier: {},
      },
    ],
  },
};
