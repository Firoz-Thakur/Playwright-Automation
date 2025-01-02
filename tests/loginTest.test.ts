import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const testDataPath = path.join(__dirname, 'testData', 'userData.json');
console.log("Test data file path:", testDataPath); 
const testUsers = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

test.describe.parallel('Data-Driven Login Tests', () => {
  testUsers.forEach(({ description, username, password, isValid }: any) => {
    test(`${description} - ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await test.step('Navigate to Login Page', async () => {
        await loginPage.navigate();
      });
      await test.step('Enter Credentials and Submit', async () => {
        const user = username === 'admin_username' ? process.env.ADMIN_USERNAME! : username;
        const pass = password === 'admin_password' ? process.env.ADMIN_PASSWORD! : password;
        await loginPage.login(user, pass);
      });
      await test.step('Verify Login Result', async () => {
        if (isValid) {
          const title = await page.title();
          expect(title).toContain('OrangeHRM');
        } else {
          const errorMessage = await page.locator('.oxd-alert-content-text').textContent();
          expect(errorMessage).toContain('Invalid credentials');
        }
      });
    });
  });
});
