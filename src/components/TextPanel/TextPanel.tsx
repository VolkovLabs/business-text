import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { PanelProps, SelectableValue } from '@grafana/data';
import { Select, useStyles2 } from '@grafana/ui';
import { TestIds } from '../../constants';
import { Styles } from '../../styles';
import { TextOptions } from '../../types';
import { Text } from '../Text';

/**
 * Properties
 */
interface Props extends PanelProps<TextOptions> {}

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
  const onChangeFrame = (selectableValue: SelectableValue<string>) => {
    const index = data.series.findIndex((frame) => frame.refId === selectableValue.value);
    setFrameIndex(index);
  };

  /**
   * Frames
   */
  const selectableFrames = data.series.map((frame) => ({
    label: frame.name,
    value: frame.refId,
  }));

  /**
   * Selected Frame
   */
  const frame = data.series[frameIndex];

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
          <Select onChange={onChangeFrame} value={frame.refId} options={selectableFrames} />
        </div>
      )}
    </div>
  );
};
