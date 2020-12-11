import { getTemplateSrv } from '@grafana/runtime';

const date = require('helper-date');

const toFixed = (num: unknown, digits: unknown) => {
  if (typeof num !== 'number' || typeof digits !== 'number') {
    return 0;
  }
  return num.toFixed(digits);
};

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

const join = (arr: string[], sep: string): string => {
  return arr.join(sep);
};

const eq = (left: string, right: string): boolean => {
  return left === right;
};

const unlessEq = (left: string, right: string): boolean => {
  return left !== right;
};

const gt = (left: number, right: number): boolean => {
  return left > right;
};

const lt = (left: number, right: number): boolean => {
  return left < right;
};

const gte = (left: number, right: number): boolean => {
  return left >= right;
};

const lte = (left: number, right: number): boolean => {
  return left <= right;
};

const and = (left: boolean, right: boolean): boolean => {
  return left && right;
};

const or = (left: boolean, right: boolean): boolean => {
  return left || right;
};

const not = (left: boolean): boolean => {
  return !left;
};

export const registerHelpers = (handlebars: any) => {
  handlebars.registerHelper('date', date);
  handlebars.registerHelper('toFixed', toFixed);
  handlebars.registerHelper('variable', variable);
  handlebars.registerHelper('join', join);
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
