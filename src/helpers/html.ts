import { DataFrame, EventBus, getLocale, InterpolateFunction, PanelData, textUtil, TimeRange } from '@grafana/data';
import { config, locationService } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import Handlebars from 'handlebars';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

import { PanelOptions } from '../types';
import { registerHelpers } from './handlebars';
import { replaceVariablesHelper } from './variable';

/**
 * Helpers
 */
registerHelpers(Handlebars);

/**
 * Generate HTML
 */
export const generateHtml = ({
  data,
  content,
  helpers,
  timeRange,
  timeZone,
  replaceVariables,
  eventBus,
  options,
  panelData,
  dataFrame,
}: {
  data: Record<string, unknown>;
  content: string;
  helpers: string;
  timeRange: TimeRange;
  timeZone: TimeZone;
  replaceVariables: InterpolateFunction;
  eventBus: EventBus;
  options: PanelOptions;
  panelData: PanelData;
  dataFrame?: DataFrame;
}): { html: string; unsubscribe?: unknown } => {
  /**
   * Variable
   */
  Handlebars.registerHelper('variable', (name: string) => {
    return replaceVariablesHelper(name, replaceVariables);
  });

  /**
   * Variable value
   */
  Handlebars.registerHelper('variableValue', (name: string) => {
    return replaceVariables(`${name}`);
  });

  /**
   * Unsubscribe
   */
  let unsubscribe: undefined | unknown;

  /**
   * Add Custom Helpers
   */
  if (helpers) {
    const func = new Function(
      'data',
      'handlebars',
      'getLocale',
      'timeZone',
      'timeRange',
      'replaceVariables',
      'locationService',
      'eventBus',
      'panelData',
      'dataFrame',
      helpers
    );
    unsubscribe = func(
      data,
      Handlebars,
      getLocale,
      timeZone,
      timeRange,
      replaceVariables,
      locationService,
      eventBus,
      panelData,
      dataFrame,
      helpers
    );
  }

  /**
   * Handlebars
   */
  const template = Handlebars.compile(content);
  const markdown = template(data);

  /**
   * Create Markdown with Syntax Highlighting
   */
  const md = new MarkdownIt({
    html: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(str, { language: lang }).value;
      }

      return '';
    },
  });

  /**
   * Render Markdown
   */
  const html = options.wrap ? md.render(markdown) : md.renderInline(markdown);

  /**
   * Skip sanitizing if disabled in Grafana
   */
  if (config.disableSanitizeHtml) {
    return {
      html,
      unsubscribe,
    };
  }

  /**
   * Return sanitized HTML
   */
  return {
    html: textUtil.sanitize(html),
    unsubscribe,
  };
};
