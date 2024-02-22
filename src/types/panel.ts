import { DataFrame, EventBus, InterpolateFunction, PanelData, TimeRange } from '@grafana/data';
import { TimeZone } from '@grafana/schema';

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
   * External Scripts
   *
   * @type {Resource[]}
   */
  externalScripts: Resource[];

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
 * Text Properties
 */
export interface TextProperties {
  /**
   * Options
   *
   * @type {PanelOptions}
   */
  options: PanelOptions;

  /**
   * Frame
   *
   * @type {DataFrame}
   */
  frame?: DataFrame;

  /**
   * Time range of the current dashboard
   *
   * @type {TimeRange}
   */
  timeRange: TimeRange;

  /**
   * Time zone of the current dashboard
   *
   * @type {TimeZone}
   */
  timeZone: TimeZone;

  /**
   * Replace Variables
   *
   * @type {InterpolateFunction}
   */
  replaceVariables: InterpolateFunction;

  /**
   * Event Bus
   *
   * @type {EventBus}
   */
  eventBus: EventBus;

  /**
   * Data
   *
   * @type {PanelData}
   */
  data: PanelData;
}
