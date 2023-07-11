import Handlebars from 'handlebars';
import { textUtil } from '@grafana/data';
import { config } from '@grafana/runtime';
import { generateHtml } from './html';

/**
 * Mock handlebars
 */
jest.mock('handlebars', () => ({
  registerHelper: jest.fn(),
  compile: jest.fn((str: string) => () => str),
}));

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  ...jest.requireActual('@grafana/runtime'),
  config: {
    disableSanitizeHtml: false,
  },
}));

/**
 * Mock @grafana/data
 */
jest.mock('@grafana/data', () => ({
  ...jest.requireActual('@grafana/data'),
  textUtil: {
    sanitize: jest.fn((str) => str),
  },
}));

describe('HTML helpers', () => {
  describe('Generate HTML', () => {
    beforeEach(() => {
      jest.mocked(textUtil.sanitize).mockClear();
    });

    it('Should sanitize html', () => {
      const content = `<div></div>`;

      generateHtml({
        content,
      } as any);

      expect(textUtil.sanitize).toHaveBeenCalledWith(content);
    });
    it('Should not sanitize html if disabled', () => {
      const content = `<div></div>`;

      /**
       * Disable sanitizing
       */
      config.disableSanitizeHtml = true;

      generateHtml({
        content,
      } as any);

      expect(textUtil.sanitize).not.toHaveBeenCalled();

      /**
       * Return default value
       */
      config.disableSanitizeHtml = false;
    });
  });

  it('Should use variable handler', () => {
    let variableHandler: any;
    jest.mocked(Handlebars.registerHelper).mockImplementation(((name: any, handler: any) => {
      variableHandler = handler;
    }) as any);

    generateHtml({
      content: '<div></div>',
      replaceVariables: (str: string) => str,
    } as any);

    expect(Handlebars.registerHelper).toHaveBeenCalledWith('variable', expect.any(Function));

    expect(variableHandler('varName')).toEqual([]);
  });
});
