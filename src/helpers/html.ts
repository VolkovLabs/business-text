import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import { textUtil } from '@grafana/data';
import { config } from '@grafana/runtime';
import { registerHelpers } from './handlebars';

/**
 * Helpers
 */
registerHelpers(Handlebars);

/**
 * Generate HTML
 */
export const generateHtml = (data: Record<string, any>, content: string): string => {
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
