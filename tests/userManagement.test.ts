import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { UserManagementPage } from '../src/pages/userManagementPage';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Load test data from JSON file
const addNewUserPath = path.join(__dirname, 'testData', 'AddUserData.json');
const addNewUsers = JSON.parse(fs.readFileSync(addNewUserPath, 'utf-8'));

test.describe.parallel('User Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
  });

  // Add new users
  addNewUsers.forEach(({ action, description, userRole, employeeName, username, status, password }: any) => {
    test(`${description} - ${username}`, async ({ page }) => {
      const userManagementPage = new UserManagementPage(page);

      await test.step('Navigate to User Management Page', async () => {
        await userManagementPage.navigateToUserManagement();
      });

      if (action === 'add') {
        await test.step('Add a New User', async () => {
          await userManagementPage.clickAddButton();
          await userManagementPage.selectUserRole(userRole);
          await userManagementPage.fillEmployeeName(employeeName);
          await userManagementPage.selectStatus(status);
          await userManagementPage.fillUsername(username);
          await userManagementPage.fillPassword(password);
          await userManagementPage.clickSave();
        });
      }
    });
  });

  // Search and Delete users
  addNewUsers.forEach(({ action, description, userRole, employeeName, username, status, password }: any) => {
    test(`${description} - ${username} (Delete)`, async ({ page }) => {
      const userManagementPage = new UserManagementPage(page);

      await test.step('Navigate to User Management Page', async () => {
        await userManagementPage.navigateToUserManagement();
      });

      if (action === 'Search and Delete') {
        await test.step('Search and Delete Already Created User', async () => {
          await userManagementPage.clickAddButton();
          await userManagementPage.selectUserRole(userRole);
          await userManagementPage.fillEmployeeName(employeeName);
          await userManagementPage.selectStatus(status);
          await userManagementPage.fillUsername(username);
          await userManagementPage.fillPassword(password);
          await userManagementPage.clickSave();
          await userManagementPage.searchUser();
          await userManagementPage.clickOnDeleteButtonForTheSearchedUser();
        });
      }
    });
  });
});
