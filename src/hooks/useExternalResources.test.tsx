import React from 'react';
import { config } from '@grafana/runtime';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Resource, ResourceType } from '../types';
import { useExternalResources } from './useExternalResources';

/**
 * In Test Ids
 */
const InTestIds = {
  root: 'root',
};

describe('Use External Resources', () => {
  const items = [
    {
      id: '1',
      url: 'https://abc.com/main.js',
    },
    {
      id: '2',
      url: 'https://bbb.com/main.js',
    },
  ];

  const Component: React.FC<{ items: Resource[]; type: ResourceType }> = ({ items, type }) => {
    const { isLoaded } = useExternalResources({ type, items });
    return isLoaded ? <div data-testid={InTestIds.root} /> : null;
  };

  beforeAll(() => {
    config.disableSanitizeHtml = true;
    jest.spyOn(document, 'createElement');
    jest.spyOn(document.body, 'appendChild');
    jest.spyOn(document.body, 'removeChild');

    HTMLScriptElement.prototype.addEventListener = jest.fn((event, handler: any) => {
      if (event === 'load') {
        setTimeout(handler);
      }
    });

    HTMLLinkElement.prototype.addEventListener = jest.fn((event, handler: any) => {
      if (event === 'load') {
        setTimeout(handler);
      }
    });
  });

  beforeEach(() => {
    jest.mocked(document.createElement).mockClear();
    jest.mocked(document.body.appendChild).mockClear();
    jest.mocked(document.body.removeChild).mockClear();
  });

  it('Should load resources', async () => {
    const { unmount } = await act(() => render(<Component type={ResourceType.SCRIPTS} items={items} />));

    /**
     * Should add 2 resources
     */
    expect(document.body.appendChild).toHaveBeenCalledWith(
      expect.objectContaining({
        src: items[0].url,
      })
    );
    expect(document.body.appendChild).toHaveBeenCalledWith(
      expect.objectContaining({
        src: items[1].url,
      })
    );

    unmount();
  });

  it('Should load resources only once', async () => {
    const { unmount } = await act(() =>
      render(
        <>
          <Component type={ResourceType.SCRIPTS} items={items} />
          <Component type={ResourceType.SCRIPTS} items={items} />
        </>
      )
    );

    await waitFor(() => expect(screen.getAllByTestId(InTestIds.root)).toHaveLength(2));

    /**
     * Check if scripts are loaded only once
     * 1 render + 2 scripts
     */
    expect(document.body.appendChild).toHaveBeenCalledTimes(3);

    /**
     * Unmount component
     */
    unmount();
  });

  it('Should not remove resource if it is used in another component', async () => {
    const { rerender, unmount } = await act(() =>
      render(
        <>
          <Component type={ResourceType.SCRIPTS} items={items} />
          <Component type={ResourceType.SCRIPTS} items={items} />
        </>
      )
    );

    await waitFor(() => expect(screen.getAllByTestId(InTestIds.root)).toHaveLength(2));

    /**
     * Re-render with only one component
     */
    rerender(<Component type={ResourceType.SCRIPTS} items={items} />);

    expect(document.body.removeChild).not.toHaveBeenCalled();

    /**
     * Unmount component
     */
    unmount();

    expect(document.body.removeChild).toHaveBeenCalledTimes(2);
  });

  it('Should not load resource if it is already used in another component', async () => {
    const { rerender, unmount } = await act(() => render(<Component type={ResourceType.SCRIPTS} items={items} />));

    await waitFor(() => expect(screen.getAllByTestId(InTestIds.root)).toHaveLength(1));

    /**
     * Re-render with addition component
     */
    rerender(
      <>
        <Component type={ResourceType.SCRIPTS} items={items} />
        <Component type={ResourceType.SCRIPTS} items={items} />
      </>
    );

    expect(document.body.appendChild).toHaveBeenCalledTimes(3);

    /**
     * Unmount component
     */
    unmount();
  });

  it('Should update loaded state if script loading error', async () => {
    const originalListener = HTMLScriptElement.prototype.addEventListener;
    HTMLScriptElement.prototype.addEventListener = jest.fn((event, handler: any) => {
      if (event === 'error') {
        setTimeout(handler);
      }
    });

    const { unmount } = await act(() =>
      render(
        <>
          <Component type={ResourceType.SCRIPTS} items={items} />
          <Component type={ResourceType.SCRIPTS} items={items} />
        </>
      )
    );

    await waitFor(() => expect(screen.getAllByTestId(InTestIds.root)).toHaveLength(2));

    /**
     * Unmount component
     */
    unmount();

    /**
     * Set default listener
     */
    HTMLScriptElement.prototype.addEventListener = originalListener;
  });

  it('Should load styles resources', async () => {
    const { unmount } = await act(() => render(<Component type={ResourceType.STYLES} items={items} />));

    await waitFor(() => expect(screen.getByTestId(InTestIds.root)).toBeInTheDocument());

    expect(document.createElement).toHaveBeenCalledWith('link');

    /**
     * Unmount component
     */
    unmount();
  });

  it('Should not load resources if sanitizing enabled', async () => {
    config.disableSanitizeHtml = false;

    const { unmount } = await act(() => render(<Component type={ResourceType.SCRIPTS} items={items} />));

    /**
     * Should not add any resources
     */
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);

    unmount();

    /**
     * Return default value
     */
    config.disableSanitizeHtml = true;
  });
});
