import { EventBus, InterpolateFunction } from '@grafana/data';
import { locationService } from '@grafana/runtime';
import React, { useEffect, useRef } from 'react';

import { TEST_IDS } from '../../constants';
import { RowItem } from '../../types';

/**
 * Properties
 */
interface Props {
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
}

/**
 * Row
 */
export const Row: React.FC<Props> = ({ className, item, afterRender, replaceVariables, eventBus }) => {
  /**
   * Row Ref
   */
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Run After Render Function
   */
  useEffect(() => {
    let unsubscribe: unknown = null;
    if (ref.current && afterRender) {
      const func = new Function('context', afterRender);

      unsubscribe = func({
        element: ref.current,
        data: item.data,
        panelData: item.panelData,
        grafana: {
          replaceVariables,
          eventBus,
          locationService,
        },
      });
    }

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [afterRender, eventBus, item.data, item.panelData, replaceVariables]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: item.html }}
      data-testid={TEST_IDS.text.content}
    />
  );
};
