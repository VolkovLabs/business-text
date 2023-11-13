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
  { value: EditorType.AFTER_RENDER, label: 'JavaScript Code After Content Ready' },
];
