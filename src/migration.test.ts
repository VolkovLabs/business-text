import { getMigratedOptions } from './migration';
import { PanelOptions, RenderMode } from './types';

describe('Migration', () => {
  it('Should return panel options', () => {
    const options: Partial<PanelOptions> = {
      renderMode: RenderMode.EVERY_ROW,
    };

    expect(
      getMigratedOptions({
        options: options as any,
      } as any)
    ).toEqual(options);
  });

  describe('4.3.0', () => {
    it('Should normalize everyRow', () => {
      expect(getMigratedOptions({ options: { everyRow: true } } as any)).toHaveProperty(
        'renderMode',
        RenderMode.EVERY_ROW
      );
      expect(getMigratedOptions({ options: { everyRow: false } } as any)).toHaveProperty(
        'renderMode',
        RenderMode.ALL_ROWS
      );
    });
  });

  describe('5.0.0', () => {
    describe('helpers', () => {
      it.each([
        {
          name: 'data',
          initial: `
          const data = [];
          data.series.forEach();
          context.data.series.forEach();
          `,
          expected: `
          const data = [];
          context.data.series.forEach();
          context.data.series.forEach();
          `,
        },
        {
          name: 'handlebars',
          initial: `
          const helpers = handlebars.helpers;
          const helpers2 = context.handlebars.helpers;
          `,
          expected: `
          const helpers = context.handlebars.helpers;
          const helpers2 = context.handlebars.helpers;
          `,
        },
        {
          name: 'panelData',
          initial: `
          const state = panelData.state;
          `,
          expected: `
          const state = context.panelData.state;
          `,
        },
        {
          name: 'dataFrame',
          initial: `
          const id = dataFrame.refId;
          if (dataFrame.refId) {}
          if (context.dataFrame.refId) {}
          `,
          expected: `
          const id = context.dataFrame.refId;
          if (context.dataFrame.refId) {}
          if (context.dataFrame.refId) {}
          `,
        },
        {
          name: 'timeZone',
          initial: `
          const zone = timeZone;
          `,
          expected: `
          const zone = context.grafana.timeZone;
          `,
        },
        {
          name: 'timeRange',
          initial: `
          const zoneRaw = timeRange.raw
          `,
          expected: `
          const zoneRaw = context.grafana.timeRange.raw
          `,
        },
        {
          name: 'locale',
          initial: `
          const locale = getLocale();
          `,
          expected: `
          const locale = context.grafana.getLocale();
          `,
        },
        {
          name: 'grafana.replaceVariables',
          initial: `
          const replaceVariables = () => {};
          replaceVariables('123')
          `,
          expected: `
          const replaceVariables = () => {};
          context.grafana.replaceVariables('123')
          `,
        },
        {
          name: 'grafana.eventBus',
          initial: `
          eventBus.subscribe();
          `,
          expected: `
          context.grafana.eventBus.subscribe();
          `,
        },
        {
          name: 'grafana.locationService',
          initial: `
          locationService.replace()
          `,
          expected: `
          context.grafana.locationService.replace()
          `,
        },
      ])('Should migrate $name', ({ initial, expected }) => {
        expect(
          getMigratedOptions({
            pluginVersion: '4.8.0',
            options: {
              helpers: initial,
            },
          } as any).helpers
        ).toEqual(expected);
      });
    });
  });

  describe('5.6.0', () => {
    describe('Execution code', () => {
      it.each([
        {
          name: 'content',
          initial: `<br>\\n<p class=\"panel-title\">Test</p>\\n<span>next line</span>;`,
          expected: `<br>\n<p class=\"panel-title\">Test</p>\n<span>next line</span>;`,
        },
        {
          name: 'afterRender',
          initial: `console.log('after render')\\nconsole.log('after render')\\nconsole.log('after render')`,
          expected: `console.log('after render')\nconsole.log('after render')\nconsole.log('after render')`,
        },
        {
          name: 'helpers',
          initial: `console.log('before render')\\nconsole.log('before render')\\nconsole.log('before render')`,
          expected: `console.log('before render')\nconsole.log('before render')\nconsole.log('before render')`,
        },
        {
          name: 'defaultContent',
          initial: `<br>\\n<p class=\"panel-title\">Test default content</p>\\n<span>next line</span>;`,
          expected: `<br>\n<p class=\"panel-title\">Test default content</p>\n<span>next line</span>;`,
        },
        {
          name: 'styles',
          initial: `.test{ \\n  color:red;\\n}`,
          expected: `.test{ \n  color:red;\n}`,
        },
      ])('Should migrate $name', ({ initial, expected }) => {
        expect(
          getMigratedOptions({
            pluginVersion: '5.5.0',
            options: {
              helpers: initial,
              afterRender: initial,
              content: initial,
              defaultContent: initial,
              styles: initial,
            },
          } as any).helpers
        ).toEqual(expected);
        expect(
          getMigratedOptions({
            pluginVersion: '5.5.0',
            options: {
              helpers: initial,
              afterRender: initial,
              content: initial,
              defaultContent: initial,
              styles: initial,
            },
          } as any).afterRender
        ).toEqual(expected);
        expect(
          getMigratedOptions({
            pluginVersion: '5.5.0',
            options: {
              helpers: initial,
              afterRender: initial,
              content: initial,
              defaultContent: initial,
              styles: initial,
            },
          } as any).content
        ).toEqual(expected);
        expect(
          getMigratedOptions({
            pluginVersion: '5.5.0',
            options: {
              helpers: initial,
              afterRender: initial,
              content: initial,
              defaultContent: initial,
              styles: initial,
            },
          } as any).defaultContent
        ).toEqual(expected);
        expect(
          getMigratedOptions({
            pluginVersion: '5.5.0',
            options: {
              helpers: initial,
              afterRender: initial,
              content: initial,
              defaultContent: initial,
              styles: initial,
            },
          } as any).styles
        ).toEqual(expected);
      });
    });
  });
});
