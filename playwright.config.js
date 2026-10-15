// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  workers: 1, // run sequentially to respect rate limits
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
});
