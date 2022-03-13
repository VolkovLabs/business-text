import { getTemplateSrv } from '@grafana/runtime';
import dayjs from 'dayjs'

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
      if (name.startsWith("__from:") || name.startsWith("__to:")) {
        let dateFormattingString = formatDate(name, value);
        values.push(dateFormattingString);
      } else {
        values.push(value);
      }
    }

    // We don't really care about the string here.
    return '';
  });

  return values;
};

//This special formatting syntax works only available in Grafana 7.1.2+
function formatDate(name: string, value: string): string {
  let date = new Date(parseInt(value));
  if (name === "__from:date" || name === "__to:date" || name === "__from:date:iso" || name === "__to:date:iso") {
    //normal case
    //no args, defaults to ISO 8601/RFC 3339
    return dayjs(date).toISOString()
  } else if(name === "__from:date:seconds"){
    //unix seconds epoch
    const unitSeconds= (parseInt(value) / 1000).toFixed(0);
    return unitSeconds.toString();
  } else {
    //by parsing name, we can get the formatter string. ex: YYYY-MM-DD
    //any custom date format that does not include the : character
    try {
      if (name.startsWith("__from:date:")) {
        const formatter = name.substring("__from:date:".length);
        return dayjs(date).format(formatter);
      } else if (name.startsWith("__to:date:")) {
        const formatter = name.substring("__to:date:".length);
        return dayjs(date).format(formatter);
      } else {
        // if we can not get formatter, return original value
        return value;
      }
    } catch (e) {
      // if format error, return original value
      return value;
    }
  }
}


const join = (arr: string[], sep: string): string => {
  return arr.join(sep);
};

const contains = (arr: string[], value: string): boolean => {
  return arr.indexOf(value) !== -1;
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
