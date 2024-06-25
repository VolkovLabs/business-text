import { test, expect } from '@grafana/plugin-e2e';
import { TEST_IDS } from '../src/constants/tests';

test.describe('Volkovlabs Dynamictext Panel', () => {
  test('Check grafana version', async ({ grafanaVersion }) => {
    console.log('Grafana version: ', grafanaVersion);
    expect(grafanaVersion).toEqual(grafanaVersion);
  });

  test('Should display a Text', async ({ gotoDashboardPage, dashboardPage }) => {
    /**
     * Go To E2E dashboard
     * return dashboardPage
     */
    await gotoDashboardPage({ uid: 'e0b41aac-0785-4bbe-81d7-e1df69efa571' });

    /**
     * Find panel by title
     * Should be visible
     */
    await expect(dashboardPage.getPanelByTitle('Random Walk').locator).toBeHidden();

    /**
     * Check if plugin is rendered
     */
    await expect(dashboardPage.getPanelByTitle('Random Walk').locator.getByTestId(TEST_IDS.panel.root)).toBeVisible();

    /**
     * Check content
     */
    await expect(dashboardPage.getPanelByTitle('Random Walk').locator.getByTestId(TEST_IDS.panel.root)).toHaveText(`{
      "data": [
        {
          "time": 1713328742800,
          "series": "71.606"
        },
        {
          "time": 1713328762800,
          "series": "71.617"
        },
        {
          "time": 1713328782800,
          "series": "72.013"
        },
        {
          "time": 1713328802800,
          "series": "71.865"
        },
        {
          "time": 1713328822800,
          "series": "72.165"
        },
        {
          "time": 1713328842800,
          "series": "71.712"
        }
      ]
    }`);
  });
});
