import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.prod' });

console.log('BASE_URL on config:', process.env.BASE_URL);

export default defineConfig({
  testDir: 'tests',
  timeout: 30000, 
  expect: {
    timeout: 5000, 
  },
  use: {
    headless: false, 
    viewport: { width: 1280, height: 720 }, 
    actionTimeout: 0, 
    baseURL: process.env.BASE_URL, 
  },
  reporter: [
    ['allure-playwright', {
      outputFolder: 'allure-reports', 
      suiteTitle: false, 
    }],
  ],
  workers: '100%', 
  projects: [
    {
      name: 'Google Chrome', 
      use: { ...devices['Desktop Chrome'] }, 
    },
  ],
});


// All of the test were running in concurrently