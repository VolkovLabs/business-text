/**
 * Supported Languages
 */
export const enum CodeLanguage {
  HTML = 'html',
  MARKDOWN = 'markdown',
  HANDLEBARS = 'handlebars',
}

/**
 * Supported Languages Options
 */
export const CodeLanguageOptions = [
  { value: CodeLanguage.HANDLEBARS, label: 'Handlebars' },
  { value: CodeLanguage.HTML, label: 'HTML' },
  { value: CodeLanguage.MARKDOWN, label: 'Markdown' },
];

/**
 * Format
 */
export enum Format {
  NONE = 'none',
  AUTO = 'auto',
}

/**
 * Format Options
 */
export const FormatOptions = [
  { value: Format.AUTO, label: 'Auto' },
  { value: Format.NONE, label: 'Disabled' },
];
