import { FieldType, toDataFrame } from '@grafana/data';
import { RefreshEvent } from '@grafana/runtime';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { CodeLanguage, Format, TEST_IDS } from '../../constants';
import { PanelOptions, RenderMode } from '../../types';
import { TextPanel } from './TextPanel';

/**
 * Props
 */
type Props = React.ComponentProps<typeof TextPanel>;

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  ...jest.requireActual('@grafana/runtime'),
}));

/**
 * Mock @grafana/ui theme
 */
const theme = {
  color: 'blue',
};

/**
 * Mock @grafana/ui
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),

  /**
   * Mock useTheme2
   */
  useTheme2: jest.fn().mockImplementation(() => theme),

  /**
   * Mock Select component
   */
  Select: jest.fn().mockImplementation(({ options, onChange, value, ...restProps }) => (
    <select
      onChange={(event: any) => {
        if (onChange) {
          onChange(options.find((option: any) => option.value === event.target.value));
        }
      }}
      /**
       * Fix jest warnings because null value.
       * For Select component in @grafana/ui should be used null to reset value.
       */
      value={value === null ? '' : value}
      {...restProps}
    >
      {options.map(({ label, value }: any) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )),
}));

/**
 * Mock Hooks
 */
jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useExternalResources: jest.fn(() => ({
    isLoaded: true,
  })),
}));

/**
 * Panel
 */
describe('Panel', () => {
  /**
   * Default options
   */
  const defaultOptions: PanelOptions = {
    content: '',
    defaultContent: '',
    renderMode: RenderMode.ALL_ROWS,
    editors: [],
    helpers: '',
    editor: {
      format: Format.AUTO,
      language: CodeLanguage.JAVASCRIPT,
    },
    styles: '',
    status: '',
    externalScripts: [],
    externalStyles: [],
    wrap: false,
    afterRender: '',
  };

  /**
   * Event Bus
   */
  const unsubscribe = jest.fn();
  const subscribe = jest.fn(() => ({
    unsubscribe,
  }));

  const eventBus: any = {
    getStream: jest.fn(() => ({
      subscribe: jest.fn(() => ({
        unsubscribe: jest.fn(),
      })),
    })),
    subscribe,
  };

  /**
   * Get Component
   * @param props
   */
  const getComponent = ({ options = defaultOptions, ...restProps }: Partial<Props>) => {
    const data = {
      series: [
        toDataFrame({
          name: 'data',
          fields: [],
        }),
      ],
    };
    return <TextPanel data={data} options={options} eventBus={eventBus} {...(restProps as any)} />;
  };

  beforeEach(() => {
    subscribe.mockClear();
    unsubscribe.mockClear();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Should find component', async () => {
    const streamSubscribe = jest.fn(() => ({
      unsubscribe: jest.fn(),
    }));

    const eventBus = {
      getStream: jest.fn(() => ({
        subscribe: streamSubscribe,
      })),
    };

    await act(async () =>
      render(
        getComponent({
          options: { ...defaultOptions, defaultContent: 'hello' },
          replaceVariables: (str: string) => str,
          data: { series: [] } as any,
          eventBus: eventBus as any,
        })
      )
    );

    expect(screen.getByTestId(TEST_IDS.panel.root)).toBeInTheDocument();

    /**
     * Should subscribe on dashboard refresh
     */
    expect(eventBus.getStream).toHaveBeenCalledWith(RefreshEvent);
    expect(streamSubscribe).toHaveBeenCalled();
  });

  it('Should apply css for component', async () => {
    const streamSubscribe = jest.fn(() => ({
      unsubscribe: jest.fn(),
    }));

    const eventBus = {
      getStream: jest.fn(() => ({
        subscribe: streamSubscribe,
      })),
    };

    const replaceVariables = jest.fn((str: string) => str);

    await act(async () =>
      render(
        getComponent({
          options: {
            ...defaultOptions,
            defaultContent: 'hello',
            styles: '.styles-test{}; .dt-row{color:red}',
          },
          replaceVariables,
          data: { series: [] } as any,
          eventBus: eventBus as any,
          id: 5,
        })
      )
    );

    expect(replaceVariables).toHaveBeenCalledWith('.styles-test{}; .dt-row{color:red}', {
      theme: { value: { color: 'blue' } },
    });

    const panel = screen.getByTestId(TEST_IDS.panel.root);
    expect(panel).toBeInTheDocument();

    const rowClass = panel.querySelectorAll('.dt-row');
    expect(rowClass.length).toBeGreaterThan(0);

    expect(screen.getByTestId(TEST_IDS.text.content)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.text.content)).toHaveStyle({ color: 'red' });
  });

  describe('Helpers execution', () => {
    const helpers = `
      const subscription = context.grafana.eventBus.subscribe('event', () => {});
      
      return () => {
        subscription.unsubscribe();
      }
    `;

    it('Should execute code for empty data frame', () => {
      render(
        getComponent({
          options: {
            ...defaultOptions,
            defaultContent: 'hello',
            helpers,
          },
          replaceVariables: (str: string) => str,
          eventBus,
        })
      );

      /**
       * Check if code executed once
       */
      expect(subscribe).toHaveBeenCalledTimes(1);
      expect(subscribe).toHaveBeenCalledWith('event', expect.anything());

      /**
       * Check if unsubscribe is not called without component updates
       */
      expect(unsubscribe).not.toHaveBeenCalled();
    });

    it('Should call unsubscribe function on component update', () => {
      const { rerender } = render(
        getComponent({
          options: {
            ...defaultOptions,
            defaultContent: 'hello',
            helpers,
          },
          replaceVariables: (str: string) => str,
          eventBus,
        })
      );

      /**
       * Check if unsubscribe is not called
       */
      expect(unsubscribe).not.toHaveBeenCalled();

      rerender(
        getComponent({
          options: {
            ...defaultOptions,
            defaultContent: 'hello',
            helpers,
          },
          replaceVariables: (str: string) => str,
          eventBus,
        })
      );

      /**
       * Check if unsubscribe is called only once
       */
      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });

    it('Should call unsubscribe function for every row', () => {
      const values = ['111', '222'];
      const data: any = {
        series: [
          toDataFrame({
            name: 'data',
            fields: [
              {
                type: FieldType.string,
                name: 'row',
                values,
              },
            ],
          }),
        ],
      };
      const { rerender } = render(
        getComponent({
          options: {
            ...defaultOptions,
            content: 'hello',
            helpers,
            renderMode: RenderMode.EVERY_ROW,
          },
          replaceVariables: (str: string) => str,
          data,
          eventBus,
        })
      );

      /**
       * Check if code executed for every row
       */
      expect(unsubscribe).not.toHaveBeenCalled();
      expect(subscribe).toHaveBeenCalledTimes(values.length);

      rerender(
        getComponent({
          options: {
            ...defaultOptions,
            content: 'hello',
            helpers,
            renderMode: RenderMode.EVERY_ROW,
          },
          replaceVariables: (str: string) => str,
          data,
          eventBus,
        })
      );

      /**
       * Check if unsubscribe is called for every row
       */
      expect(unsubscribe).toHaveBeenCalledTimes(values.length);
    });

    it('Should call unsubscribe function for data frame', () => {
      const values = ['111', '222'];
      const data: any = {
        series: [
          toDataFrame({
            name: 'data',
            fields: [
              {
                type: FieldType.string,
                name: 'row',
                values,
              },
            ],
          }),
        ],
      };
      const { rerender } = render(
        getComponent({
          options: {
            ...defaultOptions,
            content: 'hello',
            helpers,
            renderMode: RenderMode.ALL_ROWS,
          },
          replaceVariables: (str: string) => str,
          data,
          eventBus,
        })
      );

      /**
       * Check if code executed for every row
       */
      expect(unsubscribe).not.toHaveBeenCalled();
      expect(subscribe).toHaveBeenCalledTimes(1);

      rerender(
        getComponent({
          options: {
            ...defaultOptions,
            content: 'hello',
            helpers,
            renderMode: RenderMode.EVERY_ROW,
          },
          replaceVariables: (str: string) => str,
          data,
          eventBus,
        })
      );

      /**
       * Check if unsubscribe is called once
       */
      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });

    it('Should show execution error', () => {
      /**
       * Render with invalid helpers function
       */
      const { rerender } = render(
        getComponent({
          options: {
            ...defaultOptions,
            defaultContent: 'hello',
            helpers: `abc()`,
          },
          replaceVariables: (str: string) => str,
          eventBus,
        })
      );

      /**
       * Check if error is shown
       */
      expect(screen.getByTestId(TEST_IDS.text.error)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_IDS.text.errorContent)).toBeInTheDocument();
      expect(screen.queryByTestId(TEST_IDS.text.content)).not.toBeInTheDocument();

      /**
       * Render without errors
       */
      rerender(
        getComponent({
          options: {
            ...defaultOptions,
            defaultContent: 'hello',
            helpers,
          },
          replaceVariables: (str: string) => str,
          eventBus,
        })
      );

      /**
       * Check if error is not rendered
       */
      expect(screen.queryByTestId(TEST_IDS.text.error)).not.toBeInTheDocument();

      /**
       * Check if content is rendered
       */
      expect(screen.getByTestId(TEST_IDS.text.content)).toBeInTheDocument();
    });

    it('Should show custom execution error', () => {
      /**
       * Render with invalid helpers function
       */
      render(
        getComponent({
          options: {
            ...defaultOptions,
            defaultContent: 'hello',
            helpers: `throw 'abc'`,
          },
          replaceVariables: (str: string) => str,
          eventBus,
        })
      );

      /**
       * Check if error is shown
       */
      expect(screen.getByTestId(TEST_IDS.text.error)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_IDS.text.errorContent)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_IDS.text.errorContent)).toHaveTextContent('abc');
    });
  });

  describe('Frames', () => {
    it('Should show field frame if frames are several', () => {
      render(
        getComponent({
          options: { ...defaultOptions, defaultContent: 'hello' },
          replaceVariables: (str: string) => str,
          data: {
            series: [
              {
                refId: 'A',
              },
              {
                refId: 'B',
              },
            ],
          } as any,
        })
      );

      const fieldFrame = screen.getByTestId(TEST_IDS.panel.fieldFrame);
      expect(fieldFrame).toBeInTheDocument();
      expect(fieldFrame).toHaveValue('A');
    });

    it('Should change frame', () => {
      render(
        getComponent({
          options: { ...defaultOptions, defaultContent: 'hello' },
          replaceVariables: (str: string) => str,
          data: {
            series: [
              {
                refId: 'A',
              },
              {
                refId: 'B',
              },
            ],
          } as any,
        })
      );

      const fieldFrame = screen.getByTestId(TEST_IDS.panel.fieldFrame);

      fireEvent.change(fieldFrame, { target: { value: 'B' } });

      expect(fieldFrame).toHaveValue('B');
    });
  });
});
