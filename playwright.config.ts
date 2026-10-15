import { defineConfig } from '@playwright/test';

/**
 * Playwright Test Configuration for Astronauts QA Assessment (ReqRes API Automation)
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  retries: 0,
  workers: 1, // Sequential execution to prevent rate limiting (429) on ReqRes free public API
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(process.env.REQRES_API_KEY ? { 'x-api-key': process.env.REQRES_API_KEY } : {})
    }
  }
});
