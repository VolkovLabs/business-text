import {
  AlertErrorPayload,
  AlertPayload,
  DataFrame,
  EventBus,
  getLocale,
  GrafanaTheme2,
  InterpolateFunction,
  PanelData,
  TimeRange,
} from '@grafana/data';
import { LocationService } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import handlebars from 'handlebars';

import { CodeLanguage, Format } from '../constants';

/**
 * Editor Options
 */
export interface EditorOptions {
  /**
   * Height
   *
   * @type {number}
   */
  height: number;

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

/**
 * Helpers Editor Context
 */
export interface HelpersEditorContext {
  /**
   * Row Data
   */
  data: Record<string, unknown>;

  /**
   * Handlebars
   */
  handlebars: typeof handlebars;

  /**
   * Panel Data
   */
  panelData: PanelData;

  /**
   * Selected Data Frame
   */
  dataFrame?: DataFrame;

  /**
   * Grafana
   */
  grafana: {
    /**
     * Get Locale
     */
    getLocale: typeof getLocale;

    /**
     * Time Zone
     */
    theme: GrafanaTheme2;

    /**
     * Time Zone
     */
    timeZone: TimeZone;

    /**
     * Time Range
     */
    timeRange: TimeRange;

    /**
     * Replace Variables
     */
    replaceVariables: InterpolateFunction;

    /**
     * Location Service
     */
    locationService: LocationService;

    /**
     * Event Bus
     */
    eventBus: EventBus;

    /**
     * notifySuccess
     */
    notifySuccess: (payload: AlertPayload) => void;

    /**
     * notifyError
     */
    notifyError: (payload: AlertErrorPayload) => void;
  };
}
