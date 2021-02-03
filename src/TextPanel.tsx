import React, { useState } from 'react';
import { PanelProps, DataFrameView, GrafanaTheme, textUtil } from '@grafana/data';
import { Select, stylesFactory, useTheme } from '@grafana/ui';
import { TextOptions } from 'types';
import Handlebars from 'handlebars';

import MarkdownIt from 'markdown-it';

import { registerHelpers } from './helpers';
import { css, cx } from 'emotion';

registerHelpers(Handlebars);

interface Props extends PanelProps<TextOptions> {}

export const TextPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [frameIndex, setFrameIndex] = useState(0);

  const theme = useTheme();
  const styles = getStyles(theme);

  const { content } = options;

  const onChangeFrame = (selectableValue: any) => {
    const index = data.series.findIndex(frame => frame.refId === selectableValue.value);
    setFrameIndex(index);
  };

  const selectableFrames = data.series.map(frame => ({
    label: frame.name,
    value: frame.refId,
  }));

  const frame = data.series[frameIndex];

  const md = new MarkdownIt({ html: true });

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
            const template = Handlebars.compile(content ?? '');
            const markdown = template(row);
            const html = md.render(markdown);
            const sanitizedHtml = textUtil.sanitize(html);

            return <div className={styles.frame} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
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

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
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
}));
