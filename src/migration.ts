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
 * Normalize Helpers Option
 */
const normalizeHelpersOption = (code: string): string => {
  const search =
    /^(?!.*context\.)(?:.*)(handlebars|panelData|dataFrame\.|data\.|getLocale\(|timeZone|timeRange|eventBus|locationService|replaceVariables\()/gm;

  return code
    .split(' ')
    .map((part) => {
      return part.replace(search, (value, ...args) => {
        const searchTerm = args[0] || value;

        return value.replace(searchTerm, (valueToReplace) => {
          switch (valueToReplace) {
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
            case 'timeZone': {
              return 'context.grafana.timeZone';
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
      });
    })
    .join(' ');
};

/**
 * Get Migrated Options
 * @param panel
 */
export const getMigratedOptions = (panel: PanelModel<OutdatedPanelOptions & PanelOptions>): PanelOptions => {
  const { everyRow, ...actualOptions } = panel.options;

  /**
   * Normalize non context code parameters before 5.0.0
   */
  if (panel.pluginVersion && semver.lt(panel.pluginVersion, '5.0.0')) {
    actualOptions.helpers = normalizeHelpersOption(actualOptions.helpers);
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
