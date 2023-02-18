import { EditorOptions } from './editor';

export enum EditorType {
  DEFAULT = 'default',
  HELPERS = 'helpers',
  STYLES = 'styles',
}

/**
 * Options
 */
export interface TextOptions {
  /**
   * Content
   *
   * @type {string}
   */
  content: string;

  /**
   * Default Content
   *
   * @type {string}
   */
  defaultContent: string;

  /**
   * Every Row
   *
   * @type {boolean}
   */
  everyRow: boolean;

  /**
   * Editors to Display
   *
   * @type {Array<EditorType>}
   */
  editors: Array<EditorType>;

  /**
   * Editor
   *
   * @type {EditorOptions}
   */
  editor: EditorOptions;

  /**
   * Helpers
   *
   * @type {string}
   */
  helpers: string;

  /**
   * Styles
   *
   * @type {string}
   */
  styles: string;
}
