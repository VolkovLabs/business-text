import React, { useCallback, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { PanelProps, SelectableValue } from '@grafana/data';
import { Select, useStyles2 } from '@grafana/ui';
import { TestIds } from '../../constants';
import { useExternalResources } from '../../hooks';
import { Styles } from '../../styles';
import { PanelOptions, ResourceType } from '../../types';
import { Text } from '../Text';

/**
 * Properties
 */
interface Props extends PanelProps<PanelOptions> {}

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

  /**
   * Styles
   */
  const styles = useStyles2(Styles);

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
  const frame = data.series[frameIndex];

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
      data-testid={TestIds.panel.root}
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
            />
          </div>

          {data.series.length > 1 && (
            <div className={styles.frameSelect}>
              <Select
                onChange={onChangeFrame}
                value={frame.refId}
                options={selectableFrames}
                data-testid={TestIds.panel.fieldFrame}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
