import { act, renderHook } from '@testing-library/react';
import { useContentPartials } from './useContentPartials';

describe('useContentPartials', () => {
  it('Should return an empty array when no items are provided', () => {
    const { result } = renderHook(() => useContentPartials([]));
    expect(result.current.htmlContents).toEqual([]);
  });

  describe('When data is fetched successfully', () => {
    it('Should call fetchHtml and setHtmlContents when items are provided', async () => {
      const items = [
        { url: '/partial1.html', name: 'Partial 1' },
        { url: '/partial2.html', name: 'Partial 2' },
      ] as any;

      jest.mocked(fetch).mockImplementation((url, options) => {
        return Promise.resolve({
          json: Promise.resolve({}),
          text: () => Promise.resolve('<p>test</p>'),
        } as any);
      });

      let currentResult: any = [];

      await act(async () => {
        const { result } = renderHook(() => useContentPartials(items));
        currentResult = result as any;
      });

      expect(currentResult.current.htmlContents.length).toBe(2);
      expect(currentResult.current.htmlContents[0]).toEqual({ content: '<p>test</p>', name: 'Partial 1' });
      expect(currentResult.current.htmlContents[1]).toEqual({ content: '<p>test</p>', name: 'Partial 2' });
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith('/partial1.html');
      expect(fetch).toHaveBeenCalledWith('/partial2.html');
    });
  });
});
