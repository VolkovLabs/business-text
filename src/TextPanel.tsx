import React, { useState, useMemo } from 'react';
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
    const index = data.series.findIndex((frame) => frame.refId === selectableValue.value);
    setFrameIndex(index);
  };

  const selectableFrames = data.series.map((frame) => ({
    label: frame.name,
    value: frame.refId,
  }));

  const frame = data.series[frameIndex];

  /**
   * By using useMemo here, we avoid having to compile and render the Markdown
   * on every render.
   */
  const html = useMemo(() => {
    return new DataFrameView(frame).toArray().map((row, key) => {
      const md = new MarkdownIt({ html: true });

      const template = Handlebars.compile(content ?? '');
      const markdown = template(row);
      const html = md.render(markdown);
      const sanitizedHtml = textUtil.sanitize(html);

      return <div key={key} className={styles.frame} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    });
  }, [content, frame, styles]);

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
      {frame && <div style={{ flexGrow: 1, overflow: 'auto' }}>{html}</div>}

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

    table {
      border-collapse: collapse;

      th,
      td {
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        border-top: 1px solid ${theme.colors.border2};
        border-left: 1px solid ${theme.colors.border2};
      }

      th {
        font-weight: ${theme.typography.weight.semibold};
        background: ${theme.colors.bg2};
      }

      border-bottom: 1px solid ${theme.colors.border2};
      border-right: 1px solid ${theme.colors.border2};
    }

    blockquote {
      margin: ${theme.spacing.md} 0;
      border-left: 5px solid ${theme.colors.border3};
      padding: ${theme.spacing.sm};
      padding-left: ${theme.spacing.md};

      p {
        font-size: ${theme.typography.size.base};
        color: ${theme.colors.textSemiWeak};
      }
    }
  `,
}));
