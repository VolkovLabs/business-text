import { useEffect, useState } from 'react';
import { Resource, ResourceType } from '../types';
import { createResourcesManager } from '../helpers';

/**
 * External Scripts Manager
 */
const scriptsManager = createResourcesManager(ResourceType.SCRIPTS);

/**
 * External Styles Manager
 */
const stylesManager = createResourcesManager(ResourceType.STYLES);

/**
 * Use External Resources
 * @param type
 * @param items
 */
export const useExternalResources = ({ type, items }: { type: ResourceType; items: Resource[] }) => {
  /**
   * Is Resources Loaded
   */
  const [isLoaded, setIsLoaded] = useState(false);
  const resourcesManager = type === ResourceType.SCRIPTS ? scriptsManager : stylesManager;

  /**
   * Load Resources
   */
  useEffect(() => {
    const loadResources = async () => {
      /**
       * Set not loaded
       */
      setIsLoaded(false);

      /**
       * Add all resources
       */
      await Promise.all(items.map((item) => resourcesManager.add(item.url)));

      /**
       * Set loaded
       */
      setIsLoaded(true);
    };

    loadResources();

    return () => {
      /**
       * Remove resources
       */
      items.forEach((item) => resourcesManager.remove(item.url));
    };
  }, [items, resourcesManager]);

  return {
    isLoaded,
  };
};
