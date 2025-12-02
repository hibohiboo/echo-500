import {
  Given,
  When,
  Before,
  After,
  setDefaultTimeout,
  setWorldConstructor,
  Then,
} from '@cucumber/cucumber';
import { chromium, expect, Page } from '@playwright/test';

export interface CustomWorld {
  page: Page;
  init: () => Promise<void>;
}

setDefaultTimeout(20000);

function setupCustomWorld() {
  setWorldConstructor(function (this: CustomWorld) {
    this.init = async () => {
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext();
      this.page = await context.newPage();
    };
  });
}
setupCustomWorld();

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld) {
  await this.page.close();
});

// 基本操作
Given('アプリケーションを開いている', async function (this: CustomWorld) {
  await this.page.goto('http://localhost:5173');
  await this.page.waitForLoadState('networkidle');
});

When(
  '{string} ボタンをクリックする',
  async function (this: CustomWorld, buttonText: string) {
    await this.page
      .getByRole('button', { name: buttonText, exact: true })
      .click();
  },
);

When(
  'モーダルの {string} ボタンをクリックする',
  async function (this: CustomWorld, buttonText: string) {
    await this.page
      .getByRole('dialog')
      .getByRole('button', { name: buttonText, exact: true })
      .click();
  },
);
