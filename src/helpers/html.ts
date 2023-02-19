import Handlebars from 'handlebars';
import hljs from 'highlight.js';
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
