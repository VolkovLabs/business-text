import { test, expect } from '@grafana/plugin-e2e';
import { TEST_IDS } from '../src/constants/tests';

test.describe('Volkovlabs Dynamictext Panel', () => {
  test('Should display a Text', async ({ gotoDashboardPage, dashboardPage, page, grafanaVersion }) => {
    console.log('Grafana version: ', grafanaVersion);

    /**
     * Go To E2E dashboard
     * return dashboardPage
     */
    await gotoDashboardPage({ uid: 'e0b41aac-0785-4bbe-81d7-e1df69efa571' });

    /**
     * Find panel by title
     * Should be visible
     */
    await expect(dashboardPage.getPanelByTitle('Random Walk').locator).toBeVisible();

    /**
     * Check if plugin is rendered
     */
    await expect(dashboardPage.getPanelByTitle('Random Walk').locator.getByTestId(TEST_IDS.panel.root)).toBeVisible();

    /**
     * Check and compare image
     */
    await expect(
      dashboardPage.getPanelByTitle('Random Walk').locator.getByTestId(TEST_IDS.panel.root)
    ).toHaveScreenshot('actual-screenshot.png');
  });
});
