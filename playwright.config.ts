import { dirname } from 'path';
import { defineConfig, devices } from '@playwright/test';

const pluginE2eAuth = `${dirname(require.resolve('@grafana/plugin-e2e'))}/auth`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './test',
  /**
   * Run tests in files in parallel
   */
  fullyParallel: true,

  /**
   * Number of retry.
   */
  retries: 6,

  /**
   * Number of workers.
   */
  workers: 1,

  /**
   * Reporter to use. See https://playwright.dev/docs/test-reporters
   */
  reporter: 'html',

  /**
   * Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
   */
  use: {
    /**
     * Base URL to use in actions like `await page.goto('/')`.
     */
    baseURL: 'http://127.0.0.1:3000',

    /**
     * Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer.
     */
    trace: 'on-first-retry',
  },

  /**
   * Configure projects for major browsers
   */
  projects: [
    {
      name: 'auth',
      testDir: pluginE2eAuth,
      testMatch: [/.*\.js/],
    },
    {
      name: 'run-tests',
      use: {
        ...devices['Desktop Chrome'],

        /**
         * @grafana/plugin-e2e writes the auth state to this file,
         * the path should not be modified
         */
        storageState: 'playwright/.auth/admin.json',
      },
      dependencies: ['auth'],
    },
  ],
});
