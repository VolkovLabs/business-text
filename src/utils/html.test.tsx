import { textUtil } from '@grafana/data';
import { config } from '@grafana/runtime';
import { render, screen } from '@testing-library/react';
import Handlebars from 'handlebars';
import React from 'react';

import { generateHtml } from './html';

/**
 * Mock handlebars
 */
jest.mock('handlebars', () => ({
  registerHelper: jest.fn(),
  registerPartial: jest.fn(),
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
        htmlContents: [],
      } as any);

      expect(textUtil.sanitize).toHaveBeenCalledWith(content);
    });

    it('Should wrap lines', async () => {
      const content = `
        line 1
        
        line 2
      `;

      const { html } = await generateHtml({
        content,
        options,
        htmlContents: [],
      } as any);

      render(<div data-testid="root" dangerouslySetInnerHTML={{ __html: html }} />);

      expect(screen.getByTestId('root').querySelector('pre')).toBeInTheDocument();
    });

    it('Should not wrap lines', async () => {
      const content = `
        line 1
        
        line 2

        {{> aaaa }}
      `;

      const { html } = await generateHtml({
        content,
        options: {
          ...options,
          wrap: false,
        },
        htmlContents: [{ name: 'aaaa', content: '<p>test<p>' }],
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
        htmlContents: [],
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
    let variableValueHandler: any;

    jest.mocked(Handlebars.registerHelper).mockImplementation(((name: any, handler: any) => {
      if (name === 'variable') {
        variableHandler = handler;
      }
      if (name === 'variableValue') {
        variableValueHandler = handler;
      }
    }) as any);

    generateHtml({
      content: '<div></div>',
      replaceVariables: (str: string) => str,
      options,
      htmlContents: [],
    } as any);

    expect(Handlebars.registerHelper).toHaveBeenCalledWith('variable', expect.any(Function));
    expect(Handlebars.registerHelper).toHaveBeenCalledWith('variableValue', expect.any(Function));

    expect(variableHandler('varName')).toEqual([]);
    expect(variableValueHandler('varName')).toEqual('varName');
  });

  it('Should use partial handler', () => {
    let partialName: any;
    let partialContent: any;

    jest.mocked(Handlebars.registerPartial).mockImplementation(((name: any, content: any) => {
      if (name) {
        partialName = name;
      }
      if (content) {
        partialContent = content;
      }
    }) as any);

    generateHtml({
      content: '<div></div>',
      replaceVariables: (str: string) => str,
      options,
      htmlContents: [{ name: 'aaaa', content: '<p>test<p>' }],
    } as any);

    expect(Handlebars.registerPartial).toHaveBeenCalledWith('aaaa', '<p>test<p>');

    expect(partialName).toEqual('aaaa');
    expect(partialContent).toEqual('<p>test<p>');
  });

  it('Should wait until promise in code resolved', async () => {
    const content = '';

    const { unsubscribe } = await generateHtml({
      content,
      options,
      helpers: `
        return Promise.resolve(() => 123)
      `,
      htmlContents: [],
    } as any);

    expect(unsubscribe).toBeDefined();
    expect(unsubscribe).toBeInstanceOf(Function);
    expect((unsubscribe as Function)()).toEqual(123);
  });
});