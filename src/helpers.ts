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

  // Instead of interpolating the string, we collect the values in an array.
  getTemplateSrv().replace(`$${name}`, {}, (value: string | string[]) => {
    if (Array.isArray(value)) {
      values.push(...value);
    } else {
      values.push(value);
    }

    // We don't really care about the string here.
    return '';
  });

  return values;
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
