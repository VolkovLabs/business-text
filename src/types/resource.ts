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
 * Partial item
 */
export interface PartialItem {
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
 * Content item
 */
export interface ContentItem {
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
