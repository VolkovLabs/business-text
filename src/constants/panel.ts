import { EditorType, RenderMode } from '../types';

/**
 * Render Mode Options
 */
export const RENDER_MODE_OPTIONS = [
  { value: RenderMode.EVERY_ROW, label: 'Every row', icon: 'list-ul' },
  { value: RenderMode.ALL_ROWS, label: 'All rows', icon: 'book' },
  { value: RenderMode.DATA, label: 'All data', icon: 'gf-layout-simple' },
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
