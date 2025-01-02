import { Page } from '@playwright/test';


let fullUserName: any;

export class UserManagementPage {
  private page: Page;

  private adminMenu = 'a:has-text("Admin")';
  private addButton = 'button:has-text("Add")';
  private userRoleDropdown = '.oxd-select-wrapper';
  private statusDropdown = '.oxd-select-wrapper:nth-of-type(1)';
  private employeeNameInput = '.oxd-autocomplete-wrapper input[placeholder="Type for hints..."]';
  private usernameInput = '//label[text()="Username"]//following::input[1]';
  private passwordInput = '//label[text()="Password"]//following::input[1]';
  private confirmPasswordInput = '//label[text()="Confirm Password"]//following::input[1]';
  private saveButton = 'button:has-text("Save")';
  private searchButton = 'button:has-text(" Search ")';
  private deleteIconForUser = "(//div[text()='<user>']//following::i[contains(@class,'bi-trash')])[1]"
  private confirmDelete = 'button:has-text(" Yes, Delete ")'
  constructor(page: Page) {
    this.page = page;
  }

  async navigateToUserManagement() {
    await this.page.locator(this.adminMenu).click();
  }

  async clickAddButton() {
    await this.page.locator(this.addButton).click();
  }

  async selectUserRole(userRole: string) {
    await this.page.locator(this.userRoleDropdown).first().click();
    await this.page.locator('.oxd-select-dropdown div').locator(`:has-text("${userRole}")`).click();
  }

  async selectStatus(status: string) {
    await this.page.locator('.oxd-select-wrapper').nth(1).click();
    await this.page.locator('.oxd-select-dropdown div').locator(`:has-text("${status}")`).click();
  }

  async fillEmployeeName(employeeName: string) {
    await this.page.locator(this.employeeNameInput).fill(employeeName);
    await this.page.locator('.oxd-autocomplete-dropdown div').locator(`:has-text("${employeeName}")`).first().click();
  }

  async fillUsername(username: string) {
    const randomName = `user_${Math.random().toString(36).substring(2, 10)}`;
    fullUserName = username + randomName;
    console.log("full user name is :" + fullUserName);
    await this.page.locator(this.usernameInput).fill(fullUserName);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.confirmPasswordInput).fill(password);
  }

  async clickSave() {
    await this.page.locator(this.saveButton).click();
  }

  async searchUser() {
    await this.page.locator(this.usernameInput).waitFor({ state: 'visible' })
    await this.page.locator(this.usernameInput).fill(fullUserName);
    await this.page.locator(this.searchButton).waitFor({ state: 'visible' });
    await this.page.locator(this.searchButton).click();
    await this.page.waitForTimeout(1000);
  }
  async clickOnDeleteButtonForTheSearchedUser() {
    await this.page.waitForTimeout(1000);
    await this.page.locator(this.deleteIconForUser.replace('<user>', fullUserName)).waitFor({ state: 'visible' });
    await this.page.locator(this.deleteIconForUser.replace('<user>', fullUserName)).click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(this.confirmDelete).waitFor({ state: 'visible' });
    await this.page.locator(this.confirmDelete).click();
  }
}
