import { DataFrame, PanelData } from '@grafana/data';

import { EditorOptions } from './editor';
import { Resource } from './resource';

/**
 * Editor Types
 */
export enum EditorType {
  AFTER_RENDER = 'afterRender',
  DEFAULT = 'default',
  HELPERS = 'helpers',
  STYLES = 'styles',
}

/**
 * Render Mode
 */
export enum RenderMode {
  EVERY_ROW = 'everyRow',
  ALL_ROWS = 'allRows',
  DATA = 'data',
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
   * Render Mode
   *
   * @type {RenderMode}
   */
  renderMode: RenderMode;

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

  /** Status
   *
   * @type {string};
   */
  status: string;

  /**
   * External Styles
   *
   * @type {Resource[]}
   */
  externalStyles: Resource[];

  /**
   * Wrap
   *
   * @type {boolean}
   */
  wrap: boolean;

  /**
   * After Render Function
   *
   * @type {string}
   */
  afterRender: string;
}

/**
 * Row Item
 */
export interface RowItem {
  /**
   * HTML
   *
   * @type {string}
   */
  html: string;

  /**
   * Data
   *
   * @type {object | object[]}
   */
  data: object | object[];

  /**
   * Panel Data
   *
   * @type {PanelData}
   */
  panelData: PanelData;

  /**
   * Selected Data Frame
   *
   * @type {DataFrame}
   */
  dataFrame?: DataFrame;
}
