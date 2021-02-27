import React, { useState } from 'react';
import { PanelProps, GrafanaTheme, SelectableValue } from '@grafana/data';
import { InfoBox, Select, stylesFactory, useTheme } from '@grafana/ui';
import { TextOptions } from 'types';

import { Text } from './Text';

import { css, cx } from 'emotion';

interface Props extends PanelProps<TextOptions> {}

export const TextPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [frameIndex, setFrameIndex] = useState(0);

  const theme = useTheme();
  const styles = getStyles(theme);

  const onChangeFrame = (selectableValue: SelectableValue<string>) => {
    const index = data.series.findIndex((frame) => frame.refId === selectableValue.value);
    setFrameIndex(index);
  };

  const selectableFrames = data.series.map((frame) => ({
    label: frame.name,
    value: frame.refId,
  }));

  if (data.series.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <InfoBox severity="info" style={{ maxWidth: '500px' }}>
          <p>{`Your query didn't return any results.`}</p>
        </InfoBox>
      </div>
    );
  }

  const frame = data.series[frameIndex];

  return (
    <div
      className={cx(
        styles.root,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Text frame={frame} content={options.content} />

      {data.series.length > 1 && (
        <div className={styles.frameSelect}>
          <Select onChange={onChangeFrame} value={frame.refId} options={selectableFrames} />
        </div>
      )}
    </div>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  root: css`
    display: flex;
    flex-direction: column;
  `,
  frameSelect: css`
    padding: ${theme.spacing.sm};
  `,
}));
