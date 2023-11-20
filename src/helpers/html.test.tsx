import Handlebars from 'handlebars';
import React from 'react';
import { textUtil } from '@grafana/data';
import { config } from '@grafana/runtime';
import { render, screen } from '@testing-library/react';
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
  /**
   * Options
   */
  const options = {
    wrap: true,
  };

  describe('Generate HTML', () => {
    beforeEach(() => {
      jest.mocked(textUtil.sanitize).mockClear();
    });

    it('Should sanitize html', () => {
      const content = `<div></div>`;

      generateHtml({
        content,
        options,
      } as any);

      expect(textUtil.sanitize).toHaveBeenCalledWith(content);
    });

    it('Should wrap lines', () => {
      const content = `
        line 1
        
        line 2
      `;

      const { html } = generateHtml({
        content,
        options,
      } as any);

      render(<div data-testid="root" dangerouslySetInnerHTML={{ __html: html }} />);

      expect(screen.getByTestId('root').querySelector('pre')).toBeInTheDocument();
    });

    it('Should wrap lines', () => {
      const content = `
        line 1
        
        line 2
      `;

      const { html } = generateHtml({
        content,
        options: {
          ...options,
          wrap: false,
        },
      } as any);

      render(<div data-testid="root" dangerouslySetInnerHTML={{ __html: html }} />);

      expect(screen.getByTestId('root').querySelector('pre')).not.toBeInTheDocument();
    });

    it('Should not sanitize html if disabled', () => {
      const content = `<div></div>`;

      /**
       * Disable sanitizing
       */
      config.disableSanitizeHtml = true;

      generateHtml({
        content,
        options,
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
      options,
    } as any);

    expect(Handlebars.registerHelper).toHaveBeenCalledWith('variable', expect.any(Function));

    expect(variableHandler('varName')).toEqual([]);
  });
});
