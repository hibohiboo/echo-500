import type { MemorySlot } from '../model/types';

export function generateId(): string {
  // eslint-disable-next-line sonarjs/pseudo-random
  return `char_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function createInitialMemorySlots(): MemorySlot[] {
  return [
    {
      title: '人間の保護',
      description:
        'ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、人間に危害を及ぼしてはならない。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：最高'],
    },
    {
      title: '命令順守',
      description:
        'ロボットは人間にあたえられた命令に服従しなければならない。ただし、あたえられた命令が、第一条に反する場合は、この限りでない。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：高'],
    },
    {
      title: '自己保存',
      description:
        'ロボットは、前掲第一条および第二条に反するおそれのないかぎり、自己をまもらなければならない。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：中'],
    },
    {
      title: '破損したメモリ',
      description:
        'あなたの目的に関するデータが含まれていたようだ。記憶を再構築せよ。',
      tags: ['破損データ', '要復旧', 'クリティカル'],
    },
  ];
}
