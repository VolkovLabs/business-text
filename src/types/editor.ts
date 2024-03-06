import { CodeLanguage, Format } from '../constants';

/**
 * Editor Options
 */
export interface EditorOptions {
  /**
   * Format
   *
   * @type {Format}
   */
  format: Format;

  /**
   * Language
   *
   * @type {CodeLanguage}
   */
  language: CodeLanguage;
}
