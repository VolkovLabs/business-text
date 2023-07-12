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
        resolve();

        /**
         * Set Loaded State
         */
        resources[url].loaded = true;
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

      /**
       * Load Resource
       */
      return new Promise((resolve) => {
        const element = createElement(url);

        element.addEventListener('load', () => handleLoad(resolve));
        element.addEventListener('error', () => handleLoad(resolve));

        document.body.appendChild(element);

        resources[url] = {
          element,
          useCount: 1,
          loaded: false,
        };
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
      document.body.removeChild(resource.element);
    },
  };
};
