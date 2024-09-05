import { RenderMode } from '../types';
import { reorder, getFrame } from './rows';

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

describe('getFrame', () => {
  const mockFrames = [{ fields: [] }, { fields: [{ name: 'field1' }] }, { fields: [{ name: 'field2' }] }] as any;

  it('Should return a frame with fields if renderMode is DATA', () => {
    const result = getFrame(RenderMode.DATA, 0, mockFrames);
    expect(result).toEqual(mockFrames[1]);
  });

  it('Should return undefined if no frames have fields in DATA mode', () => {
    const emptyFrames = [{ fields: [] }, { fields: [] }] as any;
    const result = getFrame(RenderMode.DATA, 0, emptyFrames);
    expect(result).toBeUndefined();
  });
  it('Should return the frame at the given index if renderMode is not DATA', () => {
    const result = getFrame(RenderMode.ALL_ROWS, 1, mockFrames);
    expect(result).toEqual(mockFrames[1]);
  });

  it('Should return undefined if the index is out of range', () => {
    const result = getFrame(RenderMode.EVERY_ROW, 5, mockFrames);
    expect(result).toBeUndefined();
  });

  it('Should return undefined when series is empty', () => {
    const result = getFrame(RenderMode.DATA, 0, []);
    expect(result).toBeUndefined();
  });
});
