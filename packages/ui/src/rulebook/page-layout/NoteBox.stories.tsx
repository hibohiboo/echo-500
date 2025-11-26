import { NoteBox, ExampleBox } from './NoteBox';
import type { Meta, StoryObj } from '@storybook/react-vite';

const NoteBoxMeta = {
  title: 'Rulebook/Page Layout/NoteBox',
  component: NoteBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoteBox>;

export default NoteBoxMeta;
type NoteStory = StoryObj<typeof NoteBoxMeta>;

export const Default: NoteStory = {
  args: {
    children: <p>積まれたコマは、上から順に手番を得る。</p>,
  },
};

export const Nature: NoteStory = {
  args: {
    variant: 'nature',
    children: (
      <p>
        戦闘フレームの各項目は、選択するフレームによって決定される。
        100CPを使用してモジュールを追加購入することで、これらの値を強化できる。
      </p>
    ),
  },
};

export const MultiLine: NoteStory = {
  args: {
    children: (
      <>
        <p className="mb-2">
          戦闘スタイルは複数習得可能。習得したスタイルに応じて、
          戦闘モジュール(攻撃・防御・支援アクション)が使用可能になる。
        </p>
        <p className="m-0">ステータス補正は全スタイルの合計値が適用される。</p>
      </>
    ),
  },
};

const _ExampleBoxMeta = {
  title: 'Rulebook/Page Layout/ExampleBox',
  component: ExampleBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExampleBox>;

export const ExampleDefault: StoryObj<typeof _ExampleBoxMeta> = {
  args: {
    children: (
      <ul>
        <li>7号(シンプルな番号)</li>
        <li>アルファ-237(型式番号)</li>
        <li>ユキ(人間風の名前)</li>
        <li>ウォッチャー(役割を示す名前)</li>
      </ul>
    ),
  },
};

export const ExampleWithCustomTitle: StoryObj<typeof _ExampleBoxMeta> = {
  args: {
    title: '終了条件の例',
    children: (
      <ul>
        <li>勝利条件: ボスの戦闘不能</li>
        <li>敗北条件: 全PCの戦闘不能</li>
        <li>時間制限: カウンター50到達で敵増援</li>
        <li>特殊条件: 特定のオブジェクト破壊</li>
      </ul>
    ),
  },
};
