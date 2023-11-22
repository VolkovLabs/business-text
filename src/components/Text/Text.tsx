import { css, cx } from '@emotion/css';
import { DataFrame, EventBus, InterpolateFunction, TimeRange } from '@grafana/data';
import { TimeZone } from '@grafana/schema';
import { Alert, useStyles2 } from '@grafana/ui';
import React, { useCallback, useEffect, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { generateHtml } from '../../helpers';
import { PanelOptions, RowItem } from '../../types';
import { Row } from '../Row';
import { getStyles } from './Text.styles';

/**
 * Properties
 */
export interface Props {
  /**
   * Options
   *
   * @type {PanelOptions}
   */
  options: PanelOptions;

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

  /**
   * Event Bus
   *
   * @type {EventBus}
   */
  eventBus: EventBus;
}

/**
 * Text
 */
export const Text: React.FC<Props> = ({ options, frame, timeRange, timeZone, replaceVariables, eventBus }) => {
  /**
   * Generated rows
   */
  const [rows, setRows] = useState<RowItem[]>([]);

  /**
   * Generate html error
   */
  const [error, setError] = useState<unknown | null>(null);

  /**
   * Styles
   */
  const styles = useStyles2(getStyles);
  const className = cx(
    styles.highlight,
    styles.frame,
    css`
      ${options.styles ? replaceVariables(options.styles) : ''}
    `
  );

  /**
   * HTML
   */
  const getHtml = useCallback(
    (data: Record<string, unknown>, content: string) => {
      return {
        ...generateHtml({
          data,
          content,
          helpers: options.helpers,
          timeRange,
          timeZone,
          replaceVariables,
          eventBus,
          options,
        }),
        data,
      };
    },
    [eventBus, replaceVariables, timeRange, timeZone, options]
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

        setRows([
          {
            html,
            data: {},
          },
        ]);
        unsubscribeFn = unsubscribe;
      } else {
        /**
         * Frame returned
         */
        const data = frame.fields.reduce(
          (acc, { config, name, values, display }) => {
            values.toArray().forEach((value, i) => {
              /**
               * Status Color
               */
              const statusColor = options.status === name ? display?.(value).color : undefined;

              /**
               * Set Value and Status Color
               */
              acc[i] = { ...acc[i], [config.displayName || name]: value, statusColor };
            });

            return acc;
          },
          [] as Array<Record<string, unknown>>
        );

        if (options.everyRow) {
          /**
           * For every row in data frame
           */
          const rows = data.map((row) => getHtml(row, options.content));
          setRows(
            rows.map(({ html, data }) => ({
              html,
              data,
            }))
          );

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
          setRows([{ html, data }]);

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
  }, [
    frame?.fields,
    frame?.length,
    getHtml,
    options.content,
    options.defaultContent,
    options.everyRow,
    options.status,
  ]);

  if (error) {
    return (
      <div className={styles.frame}>
        <Alert title="Couldn't build text from template" severity="error" data-testid={TEST_IDS.text.error}>
          Please make sure the Content is a valid template and Helpers are correct.
        </Alert>

        {<pre data-testid={TEST_IDS.text.errorContent}>{error instanceof Error ? error.message : `${error}`}</pre>}
      </div>
    );
  }

  return (
    <>
      {rows.map((row, index) => (
        <Row
          key={index}
          item={row}
          className={className}
          afterRender={options.afterRender}
          eventBus={eventBus}
          replaceVariables={replaceVariables}
        />
      ))}
    </>
  );
};
