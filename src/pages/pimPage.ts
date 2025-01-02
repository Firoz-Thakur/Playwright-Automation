import { Page } from '@playwright/test';

export class PimPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPIM() {
    await this.page.click('text=PIM');
  }

  async addEmployee(firstName: string, lastName: string) {
    await this.page.click('button:has-text("Add")');
    await this.page.fill('input[name="firstName"]', firstName);
    await this.page.fill('input[name="lastName"]', lastName);
    await this.page.click('button:has-text("Save")');
  }
}
