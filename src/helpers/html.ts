import Handlebars from 'handlebars';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { getLocale, GrafanaTheme2, InterpolateFunction, textUtil, TimeRange } from '@grafana/data';
import { config, locationService } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import { registerHelpers } from './handlebars';
import { MermaidPlugin } from './mermaid';
import { replaceVariablesHelper } from './variable';

/**
 * Helpers
 */
registerHelpers(Handlebars);

/**
 * Generate HTML
 */
export const generateHtml = (
  data: Record<string, any>,
  content: string,
  helpers: string,
  timeRange: TimeRange,
  timeZone: TimeZone,
  replaceVariables: InterpolateFunction,
  theme: GrafanaTheme2
): string => {
  /**
   * Variable
   */
  Handlebars.registerHelper('variable', (name: string) => replaceVariablesHelper(name, replaceVariables));

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
      helpers
    );
    func(data, Handlebars, getLocale, timeZone, timeRange, replaceVariables, locationService, helpers);
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
   * Mermaid
   */
  md.use(MermaidPlugin, { theme: theme.isDark ? 'dark' : 'default' });

  /**
   * Render Markdown
   */
  const html = md.render(markdown);

  /**
   * Skip sanitizing if disabled in Grafana
   */
  if (config.disableSanitizeHtml) {
    return html;
  }

  /**
   * Return sanitized HTML
   */
  return textUtil.sanitize(html);
};
