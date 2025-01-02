Here's a `README.md` file that you can directly copy and use for your Playwright automation project with Allure reporting:

```markdown
# Playwright Automation with Allure Reporting

This project sets up Playwright for browser automation testing, along with Allure for generating test reports. You can run automated tests on web applications and generate detailed reports using Playwright and Allure.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node package manager)
- **Allure Commandline** (for generating reports)

### Install Node.js and npm

You can download and install the latest version of Node.js from the official website: [https://nodejs.org/](https://nodejs.org/). npm is included with Node.js by default.

### Install Allure Commandline

You can install Allure Commandline globally using npm:

```bash
npm install -g allure-commandline --save-dev
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Install Playwright dependencies:

   Playwright requires additional browser binaries. Install them by running:

   ```bash
   npx playwright install
   ```

4. Install Allure dependencies (for generating reports):

   ```bash
   npm install allure-playwright --save-dev
   ```

## Running Tests

You can run the automated tests using the following command:

```bash
npm test
```

This command will execute the Playwright tests defined in your project.

## Allure Report

To generate an Allure report for your test results, follow these steps:

1. After running your tests, you will find the result in the `allure-results` directory.
2. To generate the Allure report, run the following command:

   ```bash
   allure generate allure-results --clean -o allure-report
   ```

3. Finally, you can open the generated report using:

   ```bash
   allure open allure-report
   ```

This will launch a browser displaying the Allure report for your test execution.

## Project Structure

Here’s an overview of the project structure:

```
├── allure-results/          # Test result files for Allure
├── allure-report/           # Generated Allure reports
├── node_modules/            # Node.js dependencies
├── tests/                   # Folder containing your Playwright test scripts
├── playwright.config.js      # Playwright configuration file
├── package.json             # Project configuration file
├── package-lock.json        # Lock file for dependencies
└── README.md                # Project documentation (this file)
```

## Configuration

You can modify Playwright configuration for test execution in `playwright.config.js`. Some options you can configure include:

- **browserType**: Choose between `chromium`, `firefox`, or `webkit`.
- **headless**: Run tests in headless mode (`true`) or with a UI (`false`).
- **timeout**: Set global timeout for tests.
- **reporter**: Set Allure reporter for generating reports.

### Example Playwright Configuration (`playwright.config.js`):

```javascript
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
```

## Running Tests in Different Browsers

You can run tests in different browsers (Chromium, Firefox, Webkit) by configuring your tests or running specific commands. For example, to run tests on Firefox:

```bash
npx playwright test --project=Desktop Firefox
```
