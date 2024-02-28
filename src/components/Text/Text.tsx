import { css, cx } from '@emotion/css';
import {
  AlertErrorPayload,
  AlertPayload,
  AppEvents,
  DataFrame,
  EventBus,
  InterpolateFunction,
  PanelData,
  TimeRange,
} from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import { Alert, useStyles2, useTheme2 } from '@grafana/ui';
import React, { useCallback, useEffect, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { generateHtml } from '../../helpers';
import { PanelOptions, RenderMode, RowItem } from '../../types';
import { Row } from '../Row';
import { getStyles } from './Text.styles';

/**
 * Properties
 */
interface Props {
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

  /**
   * Data
   *
   * @type {PanelData}
   */
  data: PanelData;
}

/**
 * Text
 */
export const Text: React.FC<Props> = ({
  options,
  frame,
  timeRange,
  timeZone,
  replaceVariables,
  eventBus,
  data: panelData,
}) => {
  /**
   * Generated rows
   */
  const [rows, setRows] = useState<RowItem[]>([]);

  /**
   * Generate html error
   */
  const [error, setError] = useState<unknown | null>(null);

  /**
   * Theme and Styles
   */
  const theme = useTheme2();

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
   * Events
   */
  const appEvents = getAppEvents();

  const notifySuccess = useCallback(
    (payload: AlertPayload) => appEvents.publish({ type: AppEvents.alertSuccess.name, payload }),
    [appEvents]
  );

  const notifyError = useCallback(
    (payload: AlertErrorPayload) => appEvents.publish({ type: AppEvents.alertError.name, payload }),
    [appEvents]
  );

  /**
   * HTML
   */
  const getHtml = useCallback(
    (htmlData: Record<string, unknown>, content: string) => {
      return {
        ...generateHtml({
          data: htmlData,
          content,
          helpers: options.helpers,
          timeRange,
          timeZone,
          replaceVariables,
          eventBus,
          options,
          panelData,
          dataFrame: frame,
          notifySuccess,
          notifyError,
          theme,
        }),
        data: htmlData,
      };
    },
    [options, timeRange, timeZone, replaceVariables, eventBus, panelData, frame, notifySuccess, notifyError, theme]
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
            panelData,
            dataFrame: frame,
          },
        ]);
        unsubscribeFn = unsubscribe;
      } else {
        /**
         * Frame returned
         */
        const frames = options.renderMode === RenderMode.DATA ? panelData.series : [frame];
        const templateData = frames.map((frame) =>
          frame.fields.reduce(
            (acc, { config, name, values, display }) => {
              values.toArray().forEach((value, i) => {
                /**
                 * Status Color
                 */
                const statusColor = options.status === name ? display?.(value).color : undefined;

                /**
                 * Set Value and Status Color
                 */
                if (acc[i]?.statusColor) {
                  acc[i] = { ...acc[i], [config.displayName || name]: value };
                } else {
                  acc[i] = { ...acc[i], [config.displayName || name]: value, statusColor };
                }
              });

              return acc;
            },
            [] as Array<Record<string, unknown>>
          )
        );

        if (options.renderMode === RenderMode.EVERY_ROW) {
          /**
           * For every row in data frame
           */
          const rows = templateData[0].map((row) => getHtml(row, options.content));
          setRows(
            rows.map(({ html, data }) => ({
              html,
              data,
              panelData,
              dataFrame: frame,
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
          const data = options.renderMode === RenderMode.DATA ? templateData : templateData[0];
          const { html, unsubscribe } = getHtml({ data }, options.content);
          setRows([{ html, data, panelData, dataFrame: frame }]);

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
    frame,
    frame?.fields,
    frame?.length,
    getHtml,
    options.content,
    options.defaultContent,
    options.renderMode,
    options.status,
    panelData,
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
          timeRange={timeRange}
          timeZone={timeZone}
          replaceVariables={replaceVariables}
        />
      ))}
    </>
  );
};
