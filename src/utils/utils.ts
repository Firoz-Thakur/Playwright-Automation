import { Page, Locator } from '@playwright/test';

export function waitForElement(selector: string, timeout: number = 5000) {
  return async (page: Page) => {
    const locator: Locator = page.locator(selector);  
    try {
      await locator.waitFor({ timeout });  
    } catch (error) {
      throw new Error(`Element with selector ${selector} not found or did not load in time`);
    }
  };
}
