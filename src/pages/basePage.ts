import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async fillInput(locator: Locator, value: string) {
    await locator.fill(value);
  }
  async clickButton(locator: Locator) {
    await locator.click();
  }
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }
}
