import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import { textUtil } from '@grafana/data';
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
   * Sanitize
   */
  const sanitizedHtml = textUtil.sanitize(html);

  /**
   * Return
   */
  return sanitizedHtml;
};
