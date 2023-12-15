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
    detail: 'Panels events.',
  },
  {
    label: 'dataFrame',
    kind: CodeEditorSuggestionItemKind.Constant,
    detail: 'Selected data frame.',
  },
  {
    label: 'panelData',
    kind: CodeEditorSuggestionItemKind.Constant,
    detail: 'Panel data.',
  },
];

/**
 * After Render Editor Suggestions
 */
export const AFTER_RENDER_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = [
  {
    label: 'context',
    kind: CodeEditorSuggestionItemKind.Constant,
    detail: 'All passed possible properties and methods.',
  },
  {
    label: 'context.element',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Row html element.',
  },
  {
    label: 'context.data',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Row data.',
  },
  {
    label: 'context.dataFrame',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Selected data frame.',
  },
  {
    label: 'context.panelData',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Panel data.',
  },

  /**
   * Grafana
   */
  {
    label: 'context.grafana',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Grafana properties and methods.',
  },
  {
    label: 'context.grafana.eventBus',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Panels events.',
  },
  {
    label: 'context.grafana.locationService',
    kind: CodeEditorSuggestionItemKind.Property,
    detail: 'Location service.',
  },
  {
    label: 'context.grafana.replaceVariables',
    kind: CodeEditorSuggestionItemKind.Method,
    detail: 'Interpolate variables.',
  },
];

/**
 * Editor Type
 */
export enum EditorType {
  HELPERS = 'helpers',
  AFTER_RENDER = 'AFTER_RENDER',
  STYLES = 'styles',
  TEXT = 'text',
}
