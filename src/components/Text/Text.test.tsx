import React from 'react';
import { FieldType, toDataFrame } from '@grafana/data';
import { render, screen } from '@testing-library/react';
import { DefaultOptions, TestIds } from '../../constants';
import { Props, Text } from './Text';

/**
 * Text
 */
describe('<Text />', () => {
  /**
   * Default Content
   */
  it('Should render default content when there is no dataframe', async () => {
    const props: Props = {
      options: {
        ...DefaultOptions,
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: true,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables: (str: string) => str,
      eventBus: {} as any,
    };

    render(<Text {...props} />);

    expect(screen.getByTestId(TestIds.text.content)).toBeInTheDocument();
    expect(screen.getByTestId(TestIds.text.content)).toHaveTextContent('Test default content');
  });

  it('Should apply styles', async () => {
    const styles = `
      color: red;
    `;
    const replaceVariables = jest.fn((str: string) => str);
    const props: Props = {
      options: {
        ...DefaultOptions,
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: true,
        styles,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables,
      eventBus: {} as any,
    };

    render(<Text {...props} />);

    expect(replaceVariables).toHaveBeenCalledWith(styles);

    expect(screen.getByTestId(TestIds.text.content)).toBeInTheDocument();
    expect(screen.getByTestId(TestIds.text.content)).toHaveStyle({ color: 'red' });
  });

  it('Should apply status field', async () => {
    const replaceVariables = jest.fn((str: string) => str);
    const dataFrame = toDataFrame({
      fields: [
        {
          name: 'value',
          type: FieldType.number,
          display: (value: number) => ({ color: value > 80 ? 'red' : 'green' }),
          values: [80, 90],
        },
      ],
    });
    const props: Props = {
      frame: dataFrame,
      options: {
        ...DefaultOptions,
        status: 'value',
        content: '<div style="background-color: {{statusColor}};" data-testid="status">{{status}}</div>',
        defaultContent: 'Test default content',
        everyRow: true,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables,
      eventBus: {} as any,
    };

    render(<Text {...props} />);

    const statuses = screen.getAllByTestId('status');
    expect(statuses[0]).toHaveStyle({ backgroundColor: 'green' });
    expect(statuses[1]).toHaveStyle({ backgroundColor: 'red' });
  });

  /**
   * Render content twice
   */
  it('Should render content twice when there is a dataframe and everyRow is true', async () => {
    const nameData: string[] = ['Erik', 'Natasha'];
    const ageData: number[] = [42, 38];
    const props: Props = {
      frame: toDataFrame({
        fields: [
          {
            name: 'name',
            type: FieldType.string,
            config: {},
            values: nameData,
          },
          {
            name: 'age',
            type: FieldType.number,
            config: {},
            values: ageData,
          },
        ],
      }),
      options: {
        ...DefaultOptions,
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: true,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables: (str: string) => str,
      eventBus: {} as any,
    };

    render(<Text {...props} />);

    expect(screen.getAllByTestId(TestIds.text.content)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(TestIds.text.content)[0]).toHaveTextContent('Test content');
    expect(screen.getAllByTestId(TestIds.text.content)[1]).toBeInTheDocument();
    expect(screen.getAllByTestId(TestIds.text.content)[1]).toHaveTextContent('Test content');
  });

  /**
   * Render content once
   */
  it('Should render content once when there is a dataframe and everyRow is false', async () => {
    const props: Props = {
      frame: {
        fields: [],
        length: 2,
      },
      options: {
        ...DefaultOptions,
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: false,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables: (str: string) => str,
      eventBus: {} as any,
    };

    render(<Text {...props} />);

    expect(screen.getAllByText('Test content')).toHaveLength(1);
  });

  /**
   * Render properties
   */
  it('Should render properties of dataframe in template', async () => {
    const nameData: string[] = ['Erik', 'Natasha'];
    const ageData: number[] = [42, 38];

    const template = `| Name | Age |
| ---- | --- |
{{#each data}}
| {{name}} | {{age}} |
{{/each}}
`;

    const props: Props = {
      frame: toDataFrame({
        fields: [
          {
            name: 'name',
            type: FieldType.string,
            config: {},
            values: nameData,
          },
          {
            name: 'age',
            type: FieldType.number,
            config: {},
            values: ageData,
          },
        ],
        length: 2,
      }),
      options: {
        ...DefaultOptions,
        content: template,
        defaultContent: 'Test default content',
        everyRow: false,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables: (str: string) => str,
      eventBus: {} as any,
    };

    render(<Text {...props} />);

    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Erik');
    expect(screen.getAllByRole('row')[2]).toHaveTextContent('Natasha');
  });
});
