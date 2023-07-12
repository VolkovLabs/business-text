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
   * Type
   *
   * @type {ResourceType}
   */
  type: ResourceType;

  /**
   * Url
   *
   * @type {string}
   */
  url: string;
}
