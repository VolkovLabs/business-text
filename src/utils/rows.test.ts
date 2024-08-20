import { reorder } from './rows';

describe('Reorder', () => {
  it('Should move element up', () => {
    expect(reorder([1, 2, 3], 0, 1)).toEqual([2, 1, 3]);
  });

  it('Should move element down', () => {
    expect(reorder([1, 2, 3], 2, 1)).toEqual([1, 3, 2]);
  });

  it('Should not mutate original array', () => {
    const array = [1, 2, 3];
    const result = reorder(array, 2, 1);

    expect(array !== result).toBeTruthy();
  });
});
