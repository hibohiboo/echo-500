import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { CustomWorld } from './common.steps';

// ページ遷移
When('プレイヤーキャラクターページを開く', async function (this: CustomWorld) {
  await this.page.goto(
    'http://localhost:5173/character-sheet/player-character',
  );
  await this.page.waitForLoadState('networkidle');
});

// モーダル操作
When(
  'モーダルで名前 {string} を入力する',
  async function (this: CustomWorld, name: string) {
    const input = this.page.getByLabel(/キャラクター名/);
    await input.fill(name);
  },
);

When(
  'モーダルで名前を {string} に変更する',
  async function (this: CustomWorld, name: string) {
    const input = this.page.getByLabel(/キャラクター名/);
    await input.clear();
    await input.fill(name);
  },
);

// 編集操作
When(
  'キャラクター {string} の編集ボタンをクリックする',
  async function (this: CustomWorld, characterName: string) {
    // キャラクター名を含む見出しを探し、その親要素のdivから編集ボタンを取得
    const characterHeading = this.page.getByRole('heading', { name: characterName });
    const characterRow = characterHeading.locator('xpath=ancestor::div[contains(@class, "flex") and contains(@class, "items-center")]');
    const editButton = characterRow.getByRole('button', { name: '編集', exact: true });
    await editButton.click();
  },
);

// 削除操作
When(
  '削除確認ダイアログで {string} を選択する準備をする',
  async function (this: CustomWorld, _action: string) {
    // window.confirmを自動的にOKにする
    await this.page.evaluate(() => {
      window.confirm = () => true;
    });
  },
);

When(
  'キャラクター {string} の削除ボタンをクリックする',
  async function (this: CustomWorld, characterName: string) {
    // キャラクター名を含む見出しを探し、その親要素のdivから削除ボタンを取得
    const characterHeading = this.page.getByRole('heading', { name: characterName });
    const characterRow = characterHeading.locator('xpath=ancestor::div[contains(@class, "flex") and contains(@class, "items-center")]');
    const deleteButton = characterRow.getByRole('button', { name: '削除', exact: true });
    await deleteButton.click();
  },
);

// 検証
Then(
  'キャラクター一覧に {string} が表示される',
  async function (this: CustomWorld, characterName: string) {
    // キャラクター一覧に指定の名前が表示されることを確認
    const characterListItem = this.page.getByText(characterName);
    await expect(characterListItem).toBeVisible();
  },
);

Then(
  'キャラクター一覧に {string} が表示されない',
  async function (this: CustomWorld, characterName: string) {
    // キャラクター一覧に指定の名前が表示されないことを確認
    const characterListItem = this.page.getByText(characterName);
    await expect(characterListItem).not.toBeVisible();
  },
);
