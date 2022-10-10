import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import React from 'react';
import { TextOptions } from 'types';
import { css } from '@emotion/css';
import { DataFrame, DataFrameView, textUtil } from '@grafana/data';
import { InfoBox, useTheme } from '@grafana/ui';
import { registerHelpers } from '../../helpers';
import { getStyles } from './Text.styles';

/**
 * Helpers
 */
registerHelpers(Handlebars);

/**
 * Properties
 */
export interface TextProps extends TextOptions {
  /**
   * Frame
   *
   * @type {DataFrame}
   */
  frame?: DataFrame;
}

/**
 * Text
 */
export const Text = React.memo(({ frame, content, defaultContent, everyRow }: TextProps) => {
  /**
   * Theme
   */
  const theme = useTheme();
  const styles = getStyles(theme);

  try {
    let renderedContent;

    /**
     * Frame returned
     */
    if (frame?.length) {
      const dataframeView = new DataFrameView(frame);

      /**
       * Content
       */
      renderedContent = everyRow ? (
        dataframeView.toArray().map((row, key) => {
          return (
            <div key={key} className={styles.frame} dangerouslySetInnerHTML={{ __html: generateHtml(row, content) }} />
          );
        })
      ) : (
        <div
          className={styles.frame}
          dangerouslySetInnerHTML={{ __html: generateHtml({ data: dataframeView.toArray() }, content) }}
        />
      );
    } else {
      /**
       * Default Content
       */
      renderedContent = (
        <div className={styles.frame} dangerouslySetInnerHTML={{ __html: generateHtml({}, defaultContent) }} />
      );
    }

    return <div style={{ flexGrow: 1, overflow: 'auto' }}>{renderedContent}</div>;
  } catch (e: any) {
    /**
     * Error
     */
    return (
      <div
        className={css`
          padding: ${theme.spacing.sm};
        `}
      >
        <InfoBox title="Couldn't build text from template" severity="error">
          <p>
            Please make sure the your text content is a valid{' '}
            <a href="https://handlebarsjs.com/" target="_blank" rel="noreferrer">
              Handlebars
            </a>{' '}
            template.
          </p>
          <pre>{e instanceof Error ? e.message : e}</pre>
        </InfoBox>
      </div>
    );
  }
});

Text.displayName = 'Text';

/**
 * Generate HTML
 */
const generateHtml = (data: Record<string, any>, content: string): string => {
  const md = new MarkdownIt({ html: true });

  const template = Handlebars.compile(content);
  const markdown = template(data);
  const html = md.render(markdown);
  const sanitizedHtml = textUtil.sanitize(html);

  return sanitizedHtml;
};
