import { css, cx } from '@emotion/css';
import { PanelProps, SelectableValue } from '@grafana/data';
import { RefreshEvent } from '@grafana/runtime';
import { Select, useStyles2 } from '@grafana/ui';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { useExternalResources } from '../../hooks';
import { PanelOptions, RenderMode, ResourceType } from '../../types';
import { Text } from '../Text';
import { getStyles } from './TextPanel.styles';

/**
 * Properties
 */
type Props = PanelProps<PanelOptions>;

/**
 * Panel
 */
export const TextPanel: React.FC<Props> = ({
  options,
  data,
  width,
  height,
  timeRange,
  timeZone,
  eventBus,
  replaceVariables,
}) => {
  /**
   * States
   */
  const [frameIndex, setFrameIndex] = useState(0);
  const [, setRenderCount] = useState(0);

  /**
   * Styles
   */
  const styles = useStyles2(getStyles);

  /**
   * Change Frame
   */
  const onChangeFrame = useCallback(
    (selectableValue: SelectableValue<string>) => {
      const index = data.series.findIndex((frame) => frame.refId === selectableValue.value);
      setFrameIndex(index);
    },
    [data.series]
  );

  /**
   * Frames
   */
  const selectableFrames = useMemo(
    () =>
      data.series.map((frame) => ({
        label: frame.name,
        value: frame.refId,
      })),
    [data.series]
  );

  /**
   * Selected Frame
   */
  const frame = data.series[frameIndex] ? data.series[frameIndex] : undefined;

  /**
   * External Scripts
   */
  const { isLoaded: isScriptsLoaded } = useExternalResources({
    items: options.externalScripts,
    type: ResourceType.SCRIPTS,
  });

  /**
   * External Styles
   */
  useExternalResources({
    items: options.externalStyles,
    type: ResourceType.STYLES,
  });

  /**
   * Re-render on dashboard refresh
   */
  useEffect(() => {
    /**
     * On Refresh
     */
    const subscriber = eventBus.getStream(RefreshEvent).subscribe(() => {
      setRenderCount((prev) => prev + 1);
    });

    return () => {
      subscriber.unsubscribe();
    };
  }, [eventBus]);

  /**
   * Return
   */
  return (
    <div
      className={cx(
        styles.root,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
      data-testid={TEST_IDS.panel.root}
    >
      {isScriptsLoaded && (
        <>
          <div
            className={cx(
              styles.root,
              css`
                flex-grow: 1;
                overflow: auto;
              `
            )}
          >
            <Text
              frame={frame}
              options={options}
              timeRange={timeRange}
              timeZone={timeZone}
              replaceVariables={replaceVariables}
              eventBus={eventBus}
              data={data}
            />
          </div>

          {options.renderMode !== RenderMode.DATA && data.series.length > 1 && (
            <div className={styles.frameSelect}>
              <Select
                onChange={onChangeFrame}
                value={frame?.refId}
                options={selectableFrames}
                data-testid={TEST_IDS.panel.fieldFrame}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
