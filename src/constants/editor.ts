import { CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';

/**
 * Supported Languages
 */
export const enum CodeLanguage {
  CSS = 'css',
  HANDLEBARS = 'handlebars',
  HTML = 'html',
  JAVASCRIPT = 'javascript',
  MARKDOWN = 'markdown',
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

/**
 * Helpers Suggestions
 */
export const HelpersEditorSuggestions: CodeEditorSuggestionItem[] = [
  {
    label: 'data',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Result set of panel queries.',
  },
  {
    label: 'handlebars',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Handlebars library.',
  },
  {
    label: 'getLocale',
    kind: CodeEditorSuggestionItemKind.Method,
    detail: 'Returns locale.',
  },
];

/**
 * Styles Suggestions
 */
export const StylesEditorSuggestions: CodeEditorSuggestionItem[] = [
  {
    label: 'theme',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Themes.',
  },
];
