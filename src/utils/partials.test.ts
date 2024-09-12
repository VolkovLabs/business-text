import { fetchHtml, fetchAllPartials } from './partials';

/**
 * fetchHtml
 */
describe('fetchHtml', () => {
  it('Should fetch HTML successfully', async () => {
    const item = { id: 'test', name: 'test partial', url: 'http://example.com/template' };

    /**
     * Mock fetch
     */
    jest.mocked(fetch).mockImplementation((url, options) => {
      return Promise.resolve({
        ok: true,
        json: Promise.resolve({}),
        text: () => Promise.resolve('<p>test</p>'),
      } as any);
    });

    const result = await fetchHtml(item.url, item.name);

    /**
     * Check result
     */
    expect(fetch).toHaveBeenCalledWith(item.url);
    expect(result).toEqual({ name: item.name, content: '<p>test</p>' });
  });

  it('Should fetch HTML with error', async () => {
    const item = { id: 'test', name: 'test partial', url: 'http://example.com/template' };

    /**
     * Mock fetch
     */
    jest.mocked(fetch).mockImplementation((url, options) => {
      return Promise.resolve({
        ok: false,
      } as any);
    });

    const result = await fetchHtml(item.url, item.name);

    /**
     * Check result
     */
    expect(fetch).toHaveBeenCalledWith(item.url);
    expect(result).toEqual({ name: item.name, content: 'Unable to load template\n' });
  });
});

/**
 * fetchAllPartials
 */
describe('fetchAllPartials', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should fetch HTML successfully', async () => {
    const item = { id: 'test', name: 'test partial', url: 'http://example.com/template' };
    const item2 = { id: 'test2', name: 'test partial 2', url: 'http://example.com/template2' };

    jest.mocked(fetch).mockImplementation((url, options) => {
      return Promise.resolve({
        ok: true,
        json: Promise.resolve({}),
        text: () => Promise.resolve('<p>test</p>'),
      } as any);
    });

    const result = await fetchAllPartials([item, item2]);

    expect(fetch).toHaveBeenCalledWith(item.url);
    expect(fetch).toHaveBeenCalledWith(item2.url);
    expect(fetch).toHaveBeenCalledTimes(2);

    expect(result).toEqual([
      { name: item.name, content: '<p>test</p>' },
      { name: item2.name, content: '<p>test</p>' },
    ]);
  });
});
