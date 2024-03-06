import {
  AlertErrorPayload,
  AlertPayload,
  AppEvents,
  EventBus,
  getLocale,
  InterpolateFunction,
  TimeRange,
} from '@grafana/data';
import { getAppEvents, locationService } from '@grafana/runtime';
import { TimeZone } from '@grafana/schema';
import { useTheme2 } from '@grafana/ui';
import React, { useCallback, useEffect, useRef } from 'react';
import { RowItem } from 'types';

import { TEST_IDS } from '../../constants';
import { afterRenderCodeParameters } from '../../helpers';

/**
 * Properties
 */
export interface Props {
  /**
   * Event Bus
   *
   * @type {EventBus}
   */
  eventBus: EventBus;

  /**
   * Replace Variables
   *
   * @type {InterpolateFunction}
   */
  replaceVariables: InterpolateFunction;

  /**
   * Item
   *
   * @type {RowItem}
   */
  item: RowItem;

  /**
   * Class Name
   *
   * @type {string}
   */
  className: string;

  /**
   * After Render Function
   *
   * @type {string}
   */
  afterRender: string;

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
}

/**
 * Row
 */
export const Row: React.FC<Props> = ({
  className,
  item,
  afterRender,
  replaceVariables,
  eventBus,
  timeRange,
  timeZone,
}) => {
  /**
   * Row Ref
   */
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Theme and Styles
   */
  const theme = useTheme2();

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
   * Run After Render Function
   */
  useEffect(() => {
    let unsubscribe: unknown = null;
    if (ref.current && afterRender) {
      const func = new Function('context', afterRender);

      unsubscribe = func(
        afterRenderCodeParameters.create({
          element: ref.current,
          data: item.data,
          panelData: item.panelData,
          dataFrame: item.dataFrame,
          grafana: {
            theme,
            notifySuccess,
            notifyError,
            timeRange,
            timeZone,
            getLocale,
            replaceVariables,
            eventBus,
            locationService,
          },
        })
      );
    }

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [
    afterRender,
    eventBus,
    item.data,
    item.dataFrame,
    item.panelData,
    notifyError,
    notifySuccess,
    replaceVariables,
    theme,
    timeRange,
    timeZone,
  ]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: item.html }}
      data-testid={TEST_IDS.text.content}
    />
  );
};
