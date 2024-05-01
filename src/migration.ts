import { PanelModel } from '@grafana/data';
import semver from 'semver';

import { PanelOptions, RenderMode } from './types';

/**
 * Outdated Panel Options
 */
interface OutdatedPanelOptions {
  /**
   * Every row
   *
   * Removed in 4.3.0
   */
  everyRow?: boolean;
}

/**
 * Normalize Get Option
 */
const normalizeGetOption = (code: string): string => {
  const search =
    /(handlebars|panelData|dataFrame\.|data.|getLocale\(|timezone|timeRange|eventBus|locationService|replaceVariables\()/gm;
  return code.replace(search, (value) => {
    switch (value) {
      case 'data.': {
        return 'context.data.';
      }
      case 'handlebars': {
        return 'context.handlebars';
      }
      case 'dataFrame.': {
        return 'context.dataFrame.';
      }
      case 'panelData': {
        return 'context.panelData';
      }
      case 'getLocale(': {
        return 'context.grafana.getLocale(';
      }
      case 'timezone': {
        return 'context.grafana.timezone';
      }
      case 'timeRange': {
        return 'context.grafana.timeRange';
      }
      case 'eventBus': {
        return 'context.grafana.eventBus';
      }
      case 'locationService': {
        return 'context.grafana.locationService';
      }
      case 'replaceVariables(': {
        return 'context.grafana.replaceVariables(';
      }
      default: {
        return value;
      }
    }
  });
};

/**
 * Get Migrated Options
 * @param panel
 */
export const getMigratedOptions = (panel: PanelModel<OutdatedPanelOptions & PanelOptions>): PanelOptions => {
  const { everyRow, ...actualOptions } = panel.options;

  /**
   * Normalize non context code parameters before 6.0.0
   */
  if (panel.pluginVersion && semver.lt(panel.pluginVersion, '6.0.0')) {
    actualOptions.helpers = normalizeGetOption(actualOptions.helpers);
  }

  /**
   * Normalize every row
   */
  if (everyRow !== undefined) {
    return {
      ...actualOptions,
      renderMode: everyRow ? RenderMode.EVERY_ROW : RenderMode.ALL_ROWS,
    };
  }

  return {
    ...actualOptions,
  };
};
