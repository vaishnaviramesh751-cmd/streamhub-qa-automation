const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL || 'https://emicalculator.net',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['list'],
  ],

  timeout: 30000,

  expect: {
    timeout: 5000,
  },
});
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL || 'https://emicalculator.net',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['list'],
  ],

  timeout: 30000,

  expect: {
    timeout: 5000,
  },
});