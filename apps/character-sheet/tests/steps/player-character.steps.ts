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
    const input = this.page.getByLabel('名前');
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
