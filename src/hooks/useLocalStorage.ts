import { useCallback, useMemo } from 'react';

/**
 * Local Storage Model
 */
export const useLocalStorage = () => {
  const get = useCallback(async (key: string) => {
    const json = window.localStorage.getItem(key);
    if (json) {
      const parsed = JSON.parse(json);

      return parsed.data || parsed;
    }

    return undefined;
  }, []);

  /**
   * Update
   */
  const update = useCallback(async <T>(key: string, data: T) => {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        data,
      })
    );
    return data;
  }, []);

  return useMemo(
    () => ({
      get,
      update,
    }),
    [get, update]
  );
};
