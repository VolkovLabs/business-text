import { CodeEditorSuggestionItem } from '@grafana/ui';

import { afterRenderCodeParameters, beforeRenderCodeParameters } from '../helpers';

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
export const HELPERS_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = beforeRenderCodeParameters.suggestions;

/**
 * After Render Editor Suggestions
 */
export const AFTER_RENDER_EDITOR_SUGGESTIONS: CodeEditorSuggestionItem[] = afterRenderCodeParameters.suggestions;

/**
 * Editor Type
 */
export enum EditorType {
  AFTER_RENDER = 'AFTER_RENDER',
  HELPERS = 'helpers',
  STYLES = 'styles',
  TEXT = 'text',
}
