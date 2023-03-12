import React from 'react';
import { css, cx } from '@emotion/css';
import { DataFrame, InterpolateFunction, TimeRange } from '@grafana/data';
import { TimeZone } from '@grafana/schema';
import { Alert, useStyles2 } from '@grafana/ui';
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

  /**
   * Time range of the current dashboard
   *
   * @type {TimeRange}
   */
  timeRange: TimeRange;

  /**
   * Time zone of the current dashboard
   *
   * @type {TimeZone}
   */
  timeZone: TimeZone;

  /**
   * Replace Variables
   *
   * @type {InterpolateFunction}
   */
  replaceVariables: InterpolateFunction;
}

/**
 * Text
 */
export const Text: React.FC<Props> = ({ options, frame, timeRange, timeZone, replaceVariables }) => {
  /**
   * Styles
   */
  const styles = useStyles2(getStyles);
  const className = cx(
    styles.highlight,
    styles.frame,
    css`
      ${options.styles}
    `
  );

  /**
   * HTML
   */
  const getHtml = (data: any, content: string) =>
    generateHtml(data, content, options.helpers, timeRange, timeZone, replaceVariables);

  try {
    /**
     * Default Content if no frames returned
     */
    if (!frame?.length) {
      return <div className={className} dangerouslySetInnerHTML={{ __html: getHtml({}, options.defaultContent) }} />;
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
              className={className}
              dangerouslySetInnerHTML={{
                __html: getHtml(row, options.content),
              }}
            />
          ))}
        </>
      );
    }

    /**
     * All Rows
     */
    return <div className={className} dangerouslySetInnerHTML={{ __html: getHtml({ data }, options.content) }} />;
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
