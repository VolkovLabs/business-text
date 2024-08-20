// Jest setup provided by Grafana scaffolding
import './.config/jest-setup';

import { TextDecoder, TextEncoder } from 'util';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Fetch
 */
const fetchMock = () =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  });

global.fetch = jest.fn(fetchMock);

beforeEach(() => {
  global.fetch.mockImplementation(fetchMock);
});

/**
 * Mock ResizeObserver
 */
global.ResizeObserver = ResizeObserver;

/**
 * Assign Text Decoder and Encoder which are required in @grafana/ui
 */
Object.assign(global, { TextDecoder, TextEncoder });
