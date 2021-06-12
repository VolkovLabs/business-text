import { DataFrame, DataFrameView, GrafanaTheme, textUtil } from '@grafana/data';
import { useTheme } from '@grafana/ui';
import { css } from 'emotion';
import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import React from 'react';
import { registerHelpers } from './helpers';

registerHelpers(Handlebars);

interface TextProps {
  frame?: DataFrame;
  content: string;
  defaultContent: string;
}

export const Text = React.memo(({ frame, content, defaultContent }: TextProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div style={{ flexGrow: 1, overflow: 'auto' }}>
      {frame?.length ? (
        new DataFrameView(frame).toArray().map((row, key) => {
          return (
            <div key={key} className={styles.frame} dangerouslySetInnerHTML={{ __html: generateHtml(row, content) }} />
          );
        })
      ) : (
        <div className={styles.frame} dangerouslySetInnerHTML={{ __html: generateHtml({}, defaultContent) }} />
      )}
    </div>
  );
});
Text.displayName = 'Text';

const generateHtml = (row: Record<string, any>, content: string) => {
  const md = new MarkdownIt({ html: true });

  const template = Handlebars.compile(content);
  const markdown = template(row);
  const html = md.render(markdown);
  const sanitizedHtml = textUtil.sanitize(html);

  return sanitizedHtml;
};

const getStyles = (theme: GrafanaTheme) => ({
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
});
