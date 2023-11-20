import { FieldType, toDataFrame } from '@grafana/data';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { TestIds } from '../../constants';
import { TextPanel } from './TextPanel';

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  ...jest.requireActual('@grafana/runtime'),
}));

/**
 * Mock @grafana/ui
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),
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
  const getComponent = ({ options = { name: 'data' }, ...restProps }: any) => {
    const data = {
      series: [
        toDataFrame({
          name: 'data',
          fields: [],
        }),
      ],
    };
    return <TextPanel data={data} {...restProps} options={options} />;
  };

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Should find component', async () => {
    render(getComponent({ options: { defaultContent: 'hello' }, replaceVariables: (str: string) => str }));

    expect(screen.getByTestId(TestIds.panel.root)).toBeInTheDocument();
  });

  describe('Helpers execution', () => {
    const unsubscribe = jest.fn();
    const subscribe = jest.fn(() => ({
      unsubscribe,
    }));

    const eventBus = {
      subscribe,
    };

    const helpers = `
      const subscription = eventBus.subscribe('event', () => {});
      
      return () => {
        subscription.unsubscribe();
      }
    `;

    beforeEach(() => {
      subscribe.mockClear();
      unsubscribe.mockClear();
    });

    it('Should execute code for empty data frame', () => {
      render(
        getComponent({
          options: {
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
      const data = {
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
            content: 'hello',
            helpers,
            everyRow: true,
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
            content: 'hello',
            helpers,
            everyRow: true,
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
      const data = {
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
            content: 'hello',
            helpers,
            everyRow: false,
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
            content: 'hello',
            helpers,
            everyRow: false,
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
      expect(screen.getByTestId(TestIds.text.error)).toBeInTheDocument();
      expect(screen.getByTestId(TestIds.text.errorContent)).toBeInTheDocument();
      expect(screen.queryByTestId(TestIds.text.content)).not.toBeInTheDocument();

      /**
       * Render without errors
       */
      rerender(
        getComponent({
          options: {
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
      expect(screen.queryByTestId(TestIds.text.error)).not.toBeInTheDocument();

      /**
       * Check if content is rendered
       */
      expect(screen.getByTestId(TestIds.text.content)).toBeInTheDocument();
    });

    it('Should show custom execution error', () => {
      /**
       * Render with invalid helpers function
       */
      render(
        getComponent({
          options: {
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
      expect(screen.getByTestId(TestIds.text.error)).toBeInTheDocument();
      expect(screen.getByTestId(TestIds.text.errorContent)).toBeInTheDocument();
      expect(screen.getByTestId(TestIds.text.errorContent)).toHaveTextContent('abc');
    });
  });

  describe('Frames', () => {
    it('Should show field frame if frames are several', () => {
      render(
        getComponent({
          options: { defaultContent: 'hello' },
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
          },
        })
      );

      const fieldFrame = screen.getByTestId(TestIds.panel.fieldFrame);
      expect(fieldFrame).toBeInTheDocument();
      expect(fieldFrame).toHaveValue('A');
    });

    it('Should change frame', () => {
      render(
        getComponent({
          options: { defaultContent: 'hello' },
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
          },
        })
      );

      const fieldFrame = screen.getByTestId(TestIds.panel.fieldFrame);

      fireEvent.change(fieldFrame, { target: { value: 'B' } });

      expect(fieldFrame).toHaveValue('B');
    });
  });
});
