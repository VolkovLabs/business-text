import { CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';

/**
 * Supported Languages
 */
export const enum CodeLanguage {
  HANDLEBARS = 'handlebars',
  HTML = 'html',
  JAVASCRIPT = 'javascript',
  MARKDOWN = 'markdown',
  SCSS = 'scss',
}

/**
 * Supported Languages Options
 */
export const CODE_LANGUAGE_OPTIONS = [
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
export const FORMAT_OPTIONS = [
  { value: Format.AUTO, label: 'Auto', icon: 'font' },
  { value: Format.NONE, label: 'Disabled', icon: 'times-circle' },
];

/**
 * Helpers Suggestions
 */
export const HELPERS_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = [
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
  {
    label: 'timeRange',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Selected time range.',
  },
  {
    label: 'timeZone',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Selected time zone.',
  },
  {
    label: 'locationService',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Browser location and history.',
  },
  {
    label: 'replaceVariables',
    kind: CodeEditorSuggestionItemKind.Method,
    detail: 'Interpolate variables.',
  },
  {
    label: 'eventBus',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Event bus for application events.',
  },
];

/**
 * Editor Type
 */
export enum EditorType {
  HELPERS = 'helpers',
  STYLES = 'styles',
  TEXT = 'text',
}
