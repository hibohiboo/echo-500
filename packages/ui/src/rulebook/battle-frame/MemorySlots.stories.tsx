import { MemorySlots } from './MemorySlots';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Rulebook/Battle Frame/MemorySlots',
  component: MemorySlots,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MemorySlots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RobotLaws: Story = {
  args: {
    memorySlots: [
      {
        title: '人間の保護',
        description:
          'ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、人間に危害を及ぼしてはならない。',
        tags: ['ロボット工学三原則', 'システムコア', '優先度:最高'],
      },
      {
        title: '命令順守',
        description:
          'ロボットは人間にあたえられた命令に服従しなければならない。ただし、あたえられた命令が、第一条に反する場合は、この限りでない。',
        tags: ['ロボット工学三原則', 'システムコア', '優先度:高'],
      },
      {
        title: '自己保存',
        description:
          'ロボットは、前掲第一条および第二条に反するおそれのないかぎり、自己をまもらなければならない。',
        tags: ['ロボット工学三原則', 'システムコア', '優先度:中'],
      },
      {
        title: '破損したメモリ',
        description:
          'あなたの目的に関するデータが含まれていたようだ。記憶を再構築せよ。',
        tags: ['破損データ', '要復旧', 'クリティカル'],
      },
    ],
  },
};

export const Single: Story = {
  args: {
    memorySlots: [
      {
        title: 'カスタムメモリ',
        description: 'このスロットには特別なデータが格納されている。',
        tags: ['カスタム'],
      },
    ],
  },
};
