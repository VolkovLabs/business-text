import dayjs from 'dayjs';
import { getTemplateSrv } from '@grafana/runtime';

/**
 * Replace Variables
 */
export const variable = (name: any): string[] => {
  const values: string[] = [];

  /**
   * Instead of interpolating the string, we collect the values in an array.
   */
  getTemplateSrv().replace(`$${name}`, {}, (value: string | string[]) => {
    if (Array.isArray(value)) {
      values.push(...value);
    } else if (name.startsWith('__from:') || name.startsWith('__to:')) {
      values.push(formatDate(name, value));
    } else {
      values.push(value);
    }

    /**
     * We don't really care about the string here.
     */
    return '';
  });

  return values;
};

/**
 * Special date formatting syntax follows Global variables
 */
const formatDate = (name: string, value: string): string => {
  let date = new Date(parseInt(value, 10));

  /**
   * Normal case
   * no args, defaults to ISO 8601/RFC 3339
   */
  if (['__from:date', '__to:date', '__from:date:iso', '__to:date:iso'].includes(name)) {
    return dayjs(date).toISOString();
  }

  /**
   * Unix seconds epoch
   */
  if (['__from:date:seconds', '__to:date:seconds'].includes(name)) {
    return (parseInt(value, 10) / 1000).toFixed(0).toString();
  }

  /**
   * By parsing name, we can get the formatter string. ex: YYYY-MM-DD
   * custom date format depends on dayjs format method.
   */
  try {
    if (name.startsWith('__from:date:')) {
      const formatter = name.substring('__from:date:'.length);
      return dayjs(date).format(formatter);
    }

    if (name.startsWith('__to:date:')) {
      const formatter = name.substring('__to:date:'.length);
      return dayjs(date).format(formatter);
    }
  } catch (e) {}

  /**
   * Return original value
   */
  return value;
};
