import { Page } from '@playwright/test';
export class LoginPage {
  private page: Page;
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      console.error('BASE_URL is not defined in the environment file');
      throw new Error('BASE_URL is undefined');
    }
    console.log("Base URL: ", baseUrl);  // Log the base URL
    await this.page.goto(baseUrl);
  }

  async login(username: string, password: string) {

    await this.page.waitForLoadState('load');
    await this.page.waitForSelector(this.usernameInput, { state: 'visible' }); 
    await this.page.fill(this.usernameInput, username);
    await this.page.waitForSelector(this.passwordInput, { state: 'visible' }); 
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
  
}
