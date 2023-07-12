import { EditorOptions } from './editor';

/**
 * Editor Types
 */
export enum EditorType {
  DEFAULT = 'default',
  HELPERS = 'helpers',
  STYLES = 'styles',
}

/**
 * Panel Options
 */
export interface PanelOptions {
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
   * @type {EditorType[]}
   */
  editors: EditorType[];

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

  /**
   * Status
   *
   * @type {string};
   */
  status: string;
}
