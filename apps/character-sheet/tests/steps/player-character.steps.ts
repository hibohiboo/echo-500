import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { CustomWorld } from './common.steps';

// ページ遷移
When('キャラクター一覧ページを開く', async function (this: CustomWorld) {
  await this.page.goto('http://localhost:5173/character-sheet/');
  await this.page.waitForLoadState('networkidle');
});

// 新規作成ページ
When(
  'キャラクター作成ページで名前 {string} を入力する',
  async function (this: CustomWorld, name: string) {
    // CHARACTER NAMEラベルの入力フィールドに名前を入力
    const input = this.page.getByLabel('CHARACTER NAME');
    await input.fill(name);
  },
);

// 編集操作
When(
  'キャラクター {string} の {string} ボタンをクリックする',
  async function (this: CustomWorld, characterName: string, buttonText: string) {
    // キャラクター名を持つボタンを探し、その親要素から指定のボタンを取得
    const characterButton = this.page.getByRole('button', { name: characterName });
    const characterRow = characterButton.locator('xpath=ancestor::div[contains(@class, "character-item")]');
    const actionButton = characterRow.getByRole('button', { name: buttonText, exact: true });
    await actionButton.click();
  },
);

When(
  'キャラクター編集ページで名前を {string} に変更する',
  async function (this: CustomWorld, name: string) {
    // CHARACTER NAMEラベルの入力フィールドをクリアして新しい名前を入力
    const input = this.page.getByLabel('CHARACTER NAME');
    await input.clear();
    await input.fill(name);
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
