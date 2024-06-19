import { ResourceType } from '../types';

/**
 * Create Script Element
 * @param url
 */
const createScriptElement = (url: string): HTMLScriptElement => {
  const element = document.createElement('script');

  element.src = url;
  element.defer = true;

  return element;
};

/**
 * Create Style Element
 * @param url
 */
const createStyleElement = (url: string): HTMLLinkElement => {
  const element = document.createElement('link');

  element.href = url;
  element.rel = 'stylesheet';

  return element;
};

/**
 * Create Resources Manager
 * @param type
 */
export const createResourcesManager = (type: ResourceType) => {
  const resources: Record<
    string,
    {
      element: HTMLScriptElement | HTMLLinkElement;
      useCount: number;
      loaded: boolean;
    }
  > = {};
  const createElement = type === ResourceType.SCRIPTS ? createScriptElement : createStyleElement;

  return {
    /**
     * Add
     * @param url
     */
    add: (url: string): Promise<void> => {
      const handleLoad = (resolve: () => void) => {
        /**
         * Set Loaded State
         */
        resources[url].loaded = true;

        /**
         * Call callback
         */
        resolve();
      };

      /**
       * Resource already exists
       */
      if (resources[url]) {
        resources[url].useCount += 1;

        /**
         * Resource already loaded
         */
        if (resources[url].loaded) {
          return Promise.resolve();
        }

        /**
         * Resource is loading
         */
        return new Promise((resolve) => {
          resources[url].element.addEventListener('load', () => handleLoad(resolve));
          resources[url].element.addEventListener('error', () => handleLoad(resolve));
        });
      }

      const element = createElement(url);

      resources[url] = {
        element,
        useCount: 1,
        loaded: false,
      };

      document.body.appendChild(element);

      /**
       * Load Resource
       */
      return new Promise((resolve) => {
        element.addEventListener('load', () => handleLoad(resolve));
        element.addEventListener('error', () => handleLoad(resolve));
      });
    },
    /**
     * Remove
     * @param url
     */
    remove: (url: string) => {
      const resource = resources[url];
      if (!resource) {
        return;
      }

      /**
       * Other components use resource, so just decrease useCount
       */
      if (resource.useCount > 1) {
        resource.useCount -= 1;
        return;
      }

      /**
       * Remove resource
       */
      delete resources[url];
      document.body.removeChild(resource.element);
    },
  };
};
