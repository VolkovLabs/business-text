import { useLocalStorage } from './useLocalStorage';
import { useUserStorage } from './useUserStorage';

/**
 * User Storage
 * Should be rewrite and simplified or removed for minimal grafana version 11.5.0 for plugin. Use usePluginUserStorage only
 */
export const useStorage = () => {
  /**
   * Avoid plugin crush for grafana versions lt 11.5.0
   */
  try {
    /**
     * Return useUserStorage for grafana versions gte 11.5.0
     */
    return useUserStorage();
  } catch {
    /**
     * Return local storage
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useLocalStorage();
  }
};
