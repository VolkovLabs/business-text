import Handlebars from 'handlebars';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { EventBus, getLocale, InterpolateFunction, textUtil, TimeRange } from '@grafana/data';
import { config, locationService } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import { registerHelpers } from './handlebars';
import { replaceVariablesHelper } from './variable';
import { PanelOptions } from '../types';

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
}: {
  data: Record<string, any>;
  content: string;
  helpers: string;
  timeRange: TimeRange;
  timeZone: TimeZone;
  replaceVariables: InterpolateFunction;
  eventBus: EventBus;
  options: PanelOptions;
}): { html: string; unsubscribe?: unknown } => {
  /**
   * Variable
   */
  Handlebars.registerHelper('variable', (name: string) => replaceVariablesHelper(name, replaceVariables));

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
