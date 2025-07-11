import { act, renderHook } from '@testing-library/react';

import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'testKey';
  const version = 1;

  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Should return undefined if no data in localStorage', async () => {
    const { result } = renderHook(() => useLocalStorage());
    const data = await result.current.get(key);
    expect(data).toBeUndefined();
  });

  it('Should return data from data', async () => {
    const storedData = { hello: 'world' };
    localStorage.setItem(key, JSON.stringify({ version, data: storedData }));

    const { result } = renderHook(() => useLocalStorage());
    const data = await result.current.get(key);
    expect(data).toEqual(storedData);
  });

  it('Should return data', async () => {
    const storedData = { hello: 'world' };
    localStorage.setItem(key, JSON.stringify({ value: storedData }));

    const { result } = renderHook(() => useLocalStorage());
    const data = await result.current.get(key);
    expect(data).toEqual({ value: storedData });
  });

  it('Should save and return data', async () => {
    const { result } = renderHook(() => useLocalStorage());
    const newData = { name: 'test' };

    let updatedData;
    await act(async () => {
      updatedData = await result.current.update(key, newData);
    });

    expect(updatedData).toEqual(newData);

    const storedRaw = localStorage.getItem(key);
    expect(storedRaw).not.toBeNull();

    const stored = JSON.parse(storedRaw!);
    expect(stored).toEqual({ data: newData });
  });
});
