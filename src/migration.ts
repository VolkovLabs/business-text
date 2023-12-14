import { PanelModel } from '@grafana/data';

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
 * Get Migrated Options
 * @param panel
 */
export const getMigratedOptions = (panel: PanelModel<OutdatedPanelOptions & PanelOptions>): PanelOptions => {
  const { everyRow, ...actualOptions } = panel.options;

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
