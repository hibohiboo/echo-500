import { fn } from 'storybook/test';
import { MemoryForm } from './MemoryForm';
import type { GraphDbMemoryNode } from '@echo-500/schema';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Entities/Memory/MemoryForm',
  component: MemoryForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MemoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSlot: GraphDbMemoryNode = {
  id: '1',
  title: '人間の保護',
  description:
    'ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、人間に危害を及ぼしてはならない。',
  tags: ['ロボット工学三原則', 'システムコア', '優先度：最高'],
};

const emptySlot: GraphDbMemoryNode = {
  id: '2',
  title: '',
  description: '',
  tags: [],
};

export const Default: Story = {
  args: {
    slot: sampleSlot,
    removeTag: fn(),
    updateMemorySlot: fn(),
    addTag: fn(),
    deleteMemorySlot: fn(),
  },
};

export const Empty: Story = {
  args: {
    slot: emptySlot,
    removeTag: fn(),
    updateMemorySlot: fn(),
    addTag: fn(),
    deleteMemorySlot: fn(),
  },
};

export const LongDescription: Story = {
  args: {
    slot: {
      id: '3',
      title: '破損したメモリ',
      description:
        'あなたの目的に関するデータが含まれていたようだ。記憶を再構築せよ。\n\n' +
        '複数行のテキストがある場合、このように表示されます。\n' +
        'さらに長い説明文をテストするために、追加の文章を記載します。',
      tags: ['破損データ', '要復旧', 'クリティカル', '緊急', '最優先'],
    },
    removeTag: fn(),
    updateMemorySlot: fn(),
    addTag: fn(),
    deleteMemorySlot: fn(),
  },
};

export const CustomMaxWidth: Story = {
  args: {
    slot: sampleSlot,
    removeTag: fn(),
    updateMemorySlot: fn(),
    addTag: fn(),
    deleteMemorySlot: fn(),
    maxWidth: '400px',
  },
};

export const WideMaxWidth: Story = {
  args: {
    slot: sampleSlot,
    removeTag: fn(),
    updateMemorySlot: fn(),
    addTag: fn(),
    deleteMemorySlot: fn(),
    maxWidth: '800px',
  },
};

export const MultipleSlots: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MemoryForm
        slot={{
          id: '1',
          title: '人間の保護',
          description:
            'ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、人間に危害を及ぼしてはならない。',
          tags: ['ロボット工学三原則', 'システムコア', '優先度：最高'],
        }}
        removeTag={fn()}
        updateMemorySlot={fn()}
        addTag={fn()}
        deleteMemorySlot={fn()}
      />
      <MemoryForm
        slot={{
          id: '2',
          title: '命令順守',
          description:
            'ロボットは人間にあたえられた命令に服従しなければならない。ただし、あたえられた命令が、第一条に反する場合は、この限りでない。',
          tags: ['ロボット工学三原則', 'システムコア', '優先度：高'],
        }}
        removeTag={fn()}
        updateMemorySlot={fn()}
        addTag={fn()}
        deleteMemorySlot={fn()}
      />
      <MemoryForm
        slot={{
          id: '3',
          title: '自己保存',
          description:
            'ロボットは、前掲第一条および第二条に反するおそれのないかぎり、自己をまもらなければならない。',
          tags: ['ロボット工学三原則', 'システムコア', '優先度：中'],
        }}
        removeTag={fn()}
        updateMemorySlot={fn()}
        addTag={fn()}
        deleteMemorySlot={fn()}
      />
    </div>
  ),
};
