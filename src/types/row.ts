import { DataFrame, EventBus, InterpolateFunction, PanelData, TimeRange } from '@grafana/data';
import { TimeZone } from '@grafana/schema';

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
   * @type {DataFrame | object}
   */
  data: DataFrame | object;

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

/**
 * Row Properties
 */
export interface RowProperties {
  /**
   * Event Bus
   *
   * @type {EventBus}
   */
  eventBus: EventBus;

  /**
   * Replace Variables
   *
   * @type {InterpolateFunction}
   */
  replaceVariables: InterpolateFunction;

  /**
   * Item
   *
   * @type {RowItem}
   */
  item: RowItem;

  /**
   * Class Name
   *
   * @type {string}
   */
  className: string;

  /**
   * After Render Function
   *
   * @type {string}
   */
  afterRender: string;

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
}
