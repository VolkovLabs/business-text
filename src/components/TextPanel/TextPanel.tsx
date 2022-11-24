import React, { useState } from 'react';
import { css, cx } from '@emotion/css';
import { PanelProps, SelectableValue } from '@grafana/data';
import { Select, useTheme2 } from '@grafana/ui';
import { getStyles } from '../../styles';
import { TextOptions } from '../../types';
import { Text } from '../Text';

/**
 * Properties
 */
interface Props extends PanelProps<TextOptions> {}

/**
 * Panel
 */
export const TextPanel: React.FC<Props> = ({ options, data, width, height }) => {
  /**
   * States
   */
  const [frameIndex, setFrameIndex] = useState(0);

  /**
   * Theme
   */
  const theme = useTheme2();
  const styles = getStyles(theme);

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
      className={css`
        display: flex;
        flex-direction: column;
        width: ${width}px;
        height: ${height}px;
      `}
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
          content={options.content ?? ''}
          defaultContent={options.defaultContent ?? ''}
          everyRow={options.everyRow ?? true}
          editor={options.editor}
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
