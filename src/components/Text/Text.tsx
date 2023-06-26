import React, { useEffect, useState, useCallback } from 'react';
import { css, cx } from '@emotion/css';
import { DataFrame, InterpolateFunction, TimeRange } from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import { Alert, useStyles2 } from '@grafana/ui';
import { TestIds } from '../../constants';
import { generateHtml } from '../../helpers';
import { Styles } from '../../styles';
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
   * Generated html
   */
  const [html, setHtml] = useState<string[]>([]);

  /**
   * Generate html error
   */
  const [error, setError] = useState<unknown | null>(null);

  /**
   * Styles
   */
  const styles = useStyles2(Styles);
  const className = cx(
    styles.highlight,
    styles.frame,
    css`
      ${options.styles}
    `
  );

  /**
   * Event Bus
   */
  const eventBus = getAppEvents();

  /**
   * HTML
   */
  const getHtml = useCallback(
    (data: any, content: string) =>
      generateHtml({ data, content, helpers: options.helpers, timeRange, timeZone, replaceVariables, eventBus }),
    [eventBus, options.helpers, replaceVariables, timeRange, timeZone]
  );

  useEffect(() => {
    let unsubscribeFn: undefined | unknown;

    /**
     * Reset error before html generation
     */
    setError(null);

    try {
      if (!frame?.length) {
        /**
         * For empty frame
         */
        const { html, unsubscribe } = getHtml({}, options.defaultContent);

        setHtml([html]);
        unsubscribeFn = unsubscribe;
      } else {
        /**
         * Frame returned
         */
        const data = frame.fields.reduce((out, { config, name, values }) => {
          values.toArray().forEach((v, i) => {
            out[i] = { ...out[i], [config.displayName || name]: v };
          });

          return out;
        }, [] as Array<Record<string, any>>);

        if (options.everyRow) {
          /**
           * For every row in data frame
           */
          const rows = data.map((row) => getHtml(row, options.content));
          setHtml(rows.map(({ html }) => html));

          /**
           * Call unsubscribe for all rows
           */
          unsubscribeFn = () => {
            rows.forEach(({ unsubscribe }) => {
              if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
              }
            });
          };
        } else {
          /**
           * For whole data frame
           */
          const { html, unsubscribe } = getHtml({ data }, options.content);
          setHtml([html]);

          unsubscribeFn = unsubscribe;
        }
      }
    } catch (e) {
      setError(e);
    }

    return () => {
      if (unsubscribeFn && typeof unsubscribeFn === 'function') {
        unsubscribeFn();
      }
    };
  }, [frame?.fields, frame?.length, getHtml, options.content, options.defaultContent, options.everyRow]);

  if (error) {
    return (
      <div className={styles.frame}>
        <Alert title="Couldn't build text from template" severity="error" data-testid={TestIds.text.error}>
          Please make sure the Content is a valid template and Helpers are correct.
        </Alert>

        {<pre data-testid={TestIds.text.errorContent}>{error instanceof Error ? error.message : `${error}`}</pre>}
      </div>
    );
  }

  return (
    <>
      {html.map((html, index) => (
        <div
          key={index}
          className={className}
          dangerouslySetInnerHTML={{ __html: html }}
          data-testid={TestIds.text.content}
        />
      ))}
    </>
  );
};
