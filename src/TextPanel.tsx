import React, { useState } from 'react';
import { PanelProps, DataFrameView, SelectableValue, renderMarkdown, DataFrame, GrafanaTheme } from '@grafana/data';
import { Select, useTheme } from '@grafana/ui';
import { TextOptions } from 'types';
import Handlebars from 'handlebars';

import { registerHelpers } from './helpers';
import { css, cx } from 'emotion';

registerHelpers(Handlebars);

interface Props extends PanelProps<TextOptions> {}

export const TextPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [frameIndex, setFrameIndex] = useState(0);

  const theme = useTheme();
  const styles = makeStyles(theme);

  const { content } = options;

  const onChangeFrame = (selectableValue: any) => {
    const index = data.series.findIndex(frame => frame.refId === selectableValue.value);
    setFrameIndex(index);
  };

  const selectableFrames: SelectableValue<string>[] = data.series.map(frame => ({
    label: frame.name,
    value: frame.refId,
  }));

  const frame: DataFrame | undefined = data.series[frameIndex];

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
      {frame ? (
        <div style={{ flexGrow: 1, overflow: 'auto' }}>
          {new DataFrameView(frame).toArray().map(row => {
            const compiledTemplate = Handlebars.compile(content ?? '');
            const renderedTemplate = compiledTemplate(row);
            const renderedMarkdown = renderMarkdown(renderedTemplate);

            return <div className={styles.frame} dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />;
          })}
        </div>
      ) : null}

      {data.series.length > 1 ? (
        <div className={styles.frameSelect}>
          <Select onChange={onChangeFrame} value={frame.refId} options={selectableFrames} />
        </div>
      ) : null}
    </div>
  );
};

const makeStyles = (theme: GrafanaTheme) => ({
  root: css`
    display: flex;
    flex-direction: column;
  `,
  frameSelect: css`
    padding: ${theme.spacing.sm};
  `,
  frame: css`
    border-bottom: 1px solid ${theme.colors.panelBorder};
    margin-bottom: 1rem;
    padding: ${theme.spacing.sm};

    &:last-child {
      margin-bottom: 0;
      border-bottom: 0;
    }

    li {
      margin-left: ${theme.spacing.md};
    }
  `,
});
