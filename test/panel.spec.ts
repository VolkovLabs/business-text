import { test, expect } from '@grafana/plugin-e2e';
import { PanelHelper } from './utils';

test.describe('Volkovlabs Dynamictext Panel', () => {
  test('Check grafana version', async ({ grafanaVersion }) => {
    console.log('Grafana version: ', grafanaVersion);
    expect(grafanaVersion).toEqual(grafanaVersion);
  });

  test('Should add default text panel', async ({ readProvisionedDashboard, gotoDashboardPage }) => {
    /**
     * Go To Panels dashboard e2e.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    /**
     * Add new visualization
     */
    const editPage = await dashboardPage.addPanel();
    await editPage.setVisualization('Business Text');
    await editPage.setPanelTitle('Business Text');
    await editPage.backToDashboard();

    /**
     * Should add empty visualization without errors
     */
    const panel = new PanelHelper(dashboardPage, 'Business Text');
    await panel.checkIfNoErrors();
  });

  test('Should display content in all rows mode', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
    /**
     * Go To Panels dashboard e2e.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    const panel = new PanelHelper(dashboardPage, 'Random Walk');
    await panel.checkIfNoErrors();
    await panel.checkPresence();
    const content = panel.getContent();
    await content.checkTextContent(`{
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

  test('Should display content in every rows mode', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
    /**
     * Go To Panels dashboard e2e.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    const panel = new PanelHelper(dashboardPage, 'Random Walk Every row');
    await panel.checkIfNoErrors();
    await panel.checkPresence();
    const content = panel.getContent();
    const firstRow = content.getRow(0);
    await firstRow.checkPresence();
    await firstRow.checkTextContent(`{
          "time": 1713328742800,
          "series": "71.606"
    }`);
  });

  test('Should display content in all data mode', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
    /**
     * Go To Panels dashboard e2e.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    const panel = new PanelHelper(dashboardPage, 'Random Walk All Data');
    await panel.checkIfNoErrors();
    await panel.checkPresence();
    const content = panel.getContent();

    await content.checkTextContent(`{
      "data": [
        [
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
      ]
    }`);
  });

  test('Should display content if data frames are empty', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
    /**
     * Go To Panels dashboard allDataMode.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'allDataMode.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    const panel = new PanelHelper(dashboardPage, 'Business Text All frames are empty');
    await panel.checkIfNoErrors();
    await panel.checkPresence();

    const content = panel.getContent();
    await content.checkTextContent(`The query didn't return any results.`);
  });

  test('Should display content if some of data frames are empty', async ({
    gotoDashboardPage,
    readProvisionedDashboard,
    page,
  }) => {
    /**
     * Go To Panels dashboard allDataMode.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'allDataMode.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    const panel = new PanelHelper(dashboardPage, 'Business Text some of frames are empty');
    await panel.checkIfNoErrors();
    await panel.checkPresence();

    const content = panel.getContent();
    await content.checkTextContent(`{
      "data": [
        [],
        [],
        [
         {
          "data": "data",
          "nullData": null,
          "timestamp": "2024-08-02T00:30:18.692Z"
         }
        ],
        [],
        [
          {
           "data": "data",
           "nullData": null,
           "timestamp": "2024-08-02T00:30:18.692Z"
          }
        ]
      ]
    }`);
  });

  test('Should display content from import (libraries etc.). Flowchart', async ({
    gotoDashboardPage,
    readProvisionedDashboard,
  }) => {
    /**
     * Go To Panels dashboard libraries.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'libraries.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    const panel = new PanelHelper(dashboardPage, 'Flowchart');
    await panel.checkIfNoErrors();
    await panel.checkPresence();

    const content = panel.getContent();
    await content.checkFlowChat();
  });

  test('Should display message if no data', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
    /**
     * Go To Panels dashboard panels.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'panels.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    const panel = new PanelHelper(dashboardPage, 'No Results');
    await panel.checkIfNoErrors();
    await panel.checkPresence();

    const content = panel.getContent();
    await content.checkTextContent(`The query didn't return any results.`);
  });

  test('Should load and apply external styles', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
    /**
     * Go To Panels dashboard e2e.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    const panel = new PanelHelper(dashboardPage, 'External styles');
    await panel.checkIfNoErrors();
    await panel.checkPresence();

    const content = panel.getContent();
    const buttonElement = content.getContentElement('black-button-element');
    const textElement = content.getContentElement('red-color-text-element');

    await buttonElement.checkPresence();
    await buttonElement.checkBackgroundColor('rgb(0, 0, 0)');
    await textElement.checkPresence();
    await textElement.checkColor('rgb(244, 67, 54)');
  });
});
