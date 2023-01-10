import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import { getLocale, textUtil } from '@grafana/data';
import { config } from '@grafana/runtime';
import { registerHelpers } from './handlebars';

/**
 * Helpers
 */
registerHelpers(Handlebars);

/**
 * Generate HTML
 */
export const generateHtml = (data: Record<string, any>, content: string, helpers: string): string => {
  /**
   * Add Custom Helpers
   */
  if (helpers) {
    const func = new Function('data', 'handlebars', 'getLocale', helpers);
    func(data, Handlebars, getLocale, helpers);
  }

  /**
   * Handlebars
   */
  const template = Handlebars.compile(content);
  const markdown = template(data);

  /**
   * Render Markdown
   */
  const md = new MarkdownIt({ html: true });
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
