import { usePluginUserStorage } from '@grafana/runtime';
import { act, renderHook } from '@testing-library/react';

import { useUserStorage } from './useUserStorage';

/**
 * Mock usePluginUserStorage
 */
jest.mock('@grafana/runtime', () => ({
  usePluginUserStorage: jest.fn(),
}));

describe('useUserStorage', () => {
  /**
   * Default
   */
  const key = 'test_key';
  const version = 1;
  const mockStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(usePluginUserStorage).mockReturnValue(mockStorage);
  });

  it('Should return stored data from data', async () => {
    const storedData = { version, data: { test: 'value' } };
    mockStorage.getItem.mockResolvedValueOnce(JSON.stringify(storedData));

    const { result } = renderHook(() => useUserStorage());

    const data = await result.current.get(key);
    expect(data).toEqual({ test: 'value' });
  });

  it('Should return stored ', async () => {
    const storedData = { test: 'value' };
    mockStorage.getItem.mockResolvedValueOnce(JSON.stringify(storedData));

    const { result } = renderHook(() => useUserStorage());

    const data = await result.current.get(key);
    expect(data).toEqual({ test: 'value' });
  });

  it('Should return undefined when storage is empty', async () => {
    mockStorage.getItem.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useUserStorage());

    const data = await result.current.get(key);
    expect(data).toBeUndefined();
  });

  it('Should store data', async () => {
    const newData = { test: 'new_value' };

    const { result } = renderHook(() => useUserStorage());

    await act(async () => {
      await result.current.update(key, newData);
    });

    expect(mockStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify({
        data: newData,
      })
    );
  });
});
