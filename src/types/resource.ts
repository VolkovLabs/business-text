/**
 * Resource Type
 */
export enum ResourceType {
  SCRIPTS = 'scripts',
  STYLES = 'styles',
}

/**
 * Resource
 */
export interface Resource {
  /**
   * Id
   *
   * @type {string}
   */
  id: string;

  /**
   * Url
   *
   * @type {string}
   */
  url: string;
}

/**
 * Partial Item Config
 */
export interface PartialItemConfig {
  /**
   * Id
   *
   * @type {string}
   */
  id: string;

  /**
   * Url
   *
   * @type {string}
   */
  url: string;

  /**
   * Name
   *
   * @type {string}
   */
  name: string;
}

/**
 * Partial Item
 */
export interface PartialItem {
  /**
   * Content
   *
   * @type {string}
   */
  content: string;

  /**
   * Name
   *
   * @type {string}
   */
  name: string;
}
