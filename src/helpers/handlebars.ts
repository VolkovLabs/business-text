import * as handlebars from 'handlebars';
/**
 * Helper for Date
 */
import date from 'helper-date';

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
 * Register Helpers
 */
export const registerHelpers = (handleBars: typeof handlebars) => {
  /**
   * And
   */
  handleBars.registerHelper('and', (left: boolean, right: boolean): boolean => left && right);

  /**
   * Contains
   */
  handleBars.registerHelper('contains', (arr: string[], value: string): boolean => arr.indexOf(value) !== -1);

  /**
   * startsWith
   */
  handleBars.registerHelper('startsWith', (left: string, right: string): boolean => left.startsWith(right));

  /**
   * endsWith
   */
  handleBars.registerHelper('endsWith', (left: string, right: string): boolean => left.endsWith(right));

  /**
   * match
   */
  handleBars.registerHelper('match', (left: string, right: string): boolean => left.match(right) !== null);

  /**
   * Date
   */
  handleBars.registerHelper('date', date);

  /**
   * Equal
   */
  handleBars.registerHelper('eq', (left: string, right: string): boolean => left === right);

  /**
   * JSON
   */
  handleBars.registerHelper('json', (context: unknown) => JSON.stringify(context, null, 2));

  /**
   * Greater Than
   */
  handleBars.registerHelper('gt', (left: number, right: number): boolean => left > right);

  /**
   * Greater or Equal
   */
  handleBars.registerHelper('gte', (left: number, right: number): boolean => left >= right);

  /**
   * Join
   */
  handleBars.registerHelper('join', (arr: string[], sep: string): string => arr.join(sep));

  /**
   * Less Than
   */
  handleBars.registerHelper('lt', (left: number, right: number): boolean => left < right);

  /**
   * Less or Equal
   */
  handleBars.registerHelper('lte', (left: number, right: number): boolean => left <= right);

  /**
   * Not
   */
  handleBars.registerHelper('not', (left: boolean): boolean => !left);

  /**
   * Or
   */
  handleBars.registerHelper('or', (left: boolean, right: boolean): boolean => left || right);

  /**
   * Split
   */
  handleBars.registerHelper('split', (str: string, sep: string): string[] => str.split(sep));

  /**
   * To Fixed
   */
  handleBars.registerHelper('toFixed', toFixed);

  /**
   * Unless Equal
   */
  handleBars.registerHelper('unlessEq', (left: string, right: string): boolean => left !== right);
};
