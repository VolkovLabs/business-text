import { EditorType } from '../types';

/**
 * Rows Options
 */
export const EveryRowOptions = [
  { value: true, label: 'Every row' },
  { value: false, label: 'All rows' },
];

/**
 * Editors Options
 */
export const EditorsOptions = [
  { value: EditorType.DEFAULT, label: 'Default Content' },
  { value: EditorType.HELPERS, label: 'JavaScript Code' },
  { value: EditorType.STYLES, label: 'Styles' },
];

/**
 * Wrap Options
 */
export const WrapOptions = [
  { value: true, label: 'Enabled' },
  { value: false, label: 'Disabled' },
];
