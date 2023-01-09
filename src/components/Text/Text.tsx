import React from 'react';
import { DataFrame } from '@grafana/data';
import { Alert, useTheme2 } from '@grafana/ui';
import { generateHtml } from '../../helpers';
import { getStyles } from '../../styles';
import { TextOptions } from '../../types';

/**
 * Properties
 */
export interface Props {
  /**
   * Options
   *
   * @type {TextOptions}
   */
  options: TextOptions;

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
export const Text: React.FC<Props> = ({ options, frame }) => {
  /**
   * Theme
   */
  const theme = useTheme2();
  const styles = getStyles(theme);

  try {
    /**
     * Default Content if no frames returned
     */
    if (!frame?.length) {
      return (
        <div
          className={styles.frame}
          dangerouslySetInnerHTML={{ __html: generateHtml({}, options.defaultContent, options.helpers) }}
        />
      );
    }

    /**
     * Frame returned
     */
    const data = frame.fields.reduce((out, { config, name, values }) => {
      values.toArray().forEach((v, i) => {
        out[i] = { ...out[i], [config.displayName || name]: v };
      });

      return out;
    }, [] as Array<Record<string, any>>);

    /**
     * Every Row
     */
    if (options.everyRow) {
      return (
        <>
          {data.map((row, key) => (
            <div
              key={key}
              className={styles.frame}
              dangerouslySetInnerHTML={{ __html: generateHtml(row, options.content, options.helpers) }}
            />
          ))}
        </>
      );
    }

    /**
     * All Rows
     */
    return (
      <div
        className={styles.frame}
        dangerouslySetInnerHTML={{ __html: generateHtml({ data }, options.content, options.helpers) }}
      />
    );
  } catch (e: any) {
    /**
     * Error
     */
    return (
      <div className={styles.frame}>
        <Alert title="Couldn't build text from template" severity="error">
          Please make sure the Content is a valid template and Helpers are correct.
        </Alert>

        {<pre>{e instanceof Error ? e.message : e}</pre>}
      </div>
    );
  }
};
