import { usePluginUserStorage } from '@grafana/runtime';
import { useCallback, useMemo } from 'react';

/**
 * User Storage Model
 */
export const useUserStorage = () => {
  const storage = usePluginUserStorage();

  /**
   * Get user storage
   * should be useCallback
   * use it in a way similar to useLocalStorage
   * using userStorage.getItem directly in useEffect can cause an infinite call
   */
  const get = useCallback(async (key: string) => {
    const json = await storage.getItem(key);

    if (json) {
      const parsed = JSON.parse(json);

      return parsed.data || parsed;
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Update
   * use it in a way similar to useLocalStorage
   */
  const update = useCallback(
    async <T>(key: string, data: T) => {
      await storage.setItem(
        key,
        JSON.stringify({
          data,
        })
      );

      return data;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return useMemo(
    () => ({
      get,
      update,
    }),
    [get, update]
  );
};
