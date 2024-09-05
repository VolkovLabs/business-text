import { DataFrame } from '@grafana/data';

import { RenderMode } from '../types';

/**
 * Reorder
 * @param list
 * @param startIndex
 * @param endIndex
 */
export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Get Frame
 * @param renderMode
 * @param frameIndex
 * @param series
 */
export const getFrame = (renderMode: string, frameIndex: number, series: DataFrame[]) => {
  if (renderMode === RenderMode.DATA) {
    return series.find((frame) => !!frame.fields.length);
  }

  return series[frameIndex] ? series[frameIndex] : undefined;
};
