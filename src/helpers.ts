import dayjs from 'dayjs';
import { getTemplateSrv } from '@grafana/runtime';

const date = require('helper-date');

/**
 * To Fixed
 */
const toFixed = (num: unknown, digits: unknown) => {
  if (typeof num !== 'number' || typeof digits !== 'number') {
    return 0;
  }
  return num.toFixed(digits);
};

/**
 * Replace Variables
 */
const variable = (name: any): string[] => {
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

/**
 * Join
 */
const join = (arr: string[], sep: string): string => {
  return arr.join(sep);
};

/**
 * Contains
 */
const contains = (arr: string[], value: string): boolean => {
  return arr.indexOf(value) !== -1;
};

/**
 * Equal
 */
const eq = (left: string, right: string): boolean => {
  return left === right;
};

/**
 * Unless Equal
 */
const unlessEq = (left: string, right: string): boolean => {
  return left !== right;
};

/**
 * Greater Than
 */
const gt = (left: number, right: number): boolean => {
  return left > right;
};

/**
 * Less Than
 */
const lt = (left: number, right: number): boolean => {
  return left < right;
};

/**
 * Greater or Equal
 */
const gte = (left: number, right: number): boolean => {
  return left >= right;
};

/**
 * Less or Equal
 */
const lte = (left: number, right: number): boolean => {
  return left <= right;
};

/**
 * And
 */
const and = (left: boolean, right: boolean): boolean => {
  return left && right;
};

/**
 * Or
 */
const or = (left: boolean, right: boolean): boolean => {
  return left || right;
};

/**
 * Not
 */
const not = (left: boolean): boolean => {
  return !left;
};

/**
 * Register Helpers
 */
export const registerHelpers = (handlebars: any) => {
  handlebars.registerHelper('date', date);
  handlebars.registerHelper('toFixed', toFixed);
  handlebars.registerHelper('variable', variable);
  handlebars.registerHelper('join', join);
  handlebars.registerHelper('contains', contains);
  handlebars.registerHelper('eq', eq);
  handlebars.registerHelper('unlessEq', unlessEq);
  handlebars.registerHelper('gt', gt);
  handlebars.registerHelper('lt', lt);
  handlebars.registerHelper('gte', gte);
  handlebars.registerHelper('lte', lte);
  handlebars.registerHelper('and', and);
  handlebars.registerHelper('or', or);
  handlebars.registerHelper('not', not);
};
