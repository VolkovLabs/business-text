import { EditorType } from '../types';

/**
 * Rows Options
 */
export const EVERY_ROW_OPTIONS = [
  { value: true, label: 'Every row', icon: 'list-ul' },
  { value: false, label: 'All rows', icon: 'book' },
];

/**
 * Editors Options
 */
export const EDITORS_OPTIONS = [
  { value: EditorType.DEFAULT, label: 'Default content' },
  { value: EditorType.HELPERS, label: 'JavaScript code before content rendering' },
  { value: EditorType.AFTER_RENDER, label: 'JavaScript code after content ready' },
  { value: EditorType.STYLES, label: 'Styles' },
];

/**
 * Wrap Options
 */
export const WRAP_OPTIONS = [
  { value: true, label: 'Enabled', icon: 'file-copy-alt' },
  { value: false, label: 'Disabled', icon: 'times-circle' },
];
