import React from 'react';
import { FieldType } from '@grafana/data';
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
  it('should render default content when there is no dataframe', async () => {
    const props: Props = {
      options: {
        ...DefaultOptions,
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: true,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables: {} as any,
    };

    render(<Text {...props} />);

    expect(screen.getByTestId(TestIds.text.content)).toBeInTheDocument();
    expect(screen.getByTestId(TestIds.text.content)).toHaveTextContent('Test default content');
  });

  /**
   * Render content twice
   */
  it('should render content twice when there is a dataframe and everyRow is true', async () => {
    const nameData: string[] = ['Erik', 'Natasha'];
    const ageData: number[] = [42, 38];
    const props: Props = {
      frame: {
        fields: [
          {
            name: 'name',
            type: FieldType.string,
            config: {},
            values: {
              length: 2,
              get: (index) => nameData[index],
              toArray: () => nameData,
            },
          },
          {
            name: 'age',
            type: FieldType.number,
            config: {},
            values: {
              length: 2,
              get: (index) => ageData[index],
              toArray: () => ageData,
            },
          },
        ],
        length: 2,
      },
      options: {
        ...DefaultOptions,
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: true,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables: {} as any,
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
  it('should render content once when there is a dataframe and everyRow is false', async () => {
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
      replaceVariables: {} as any,
    };

    render(<Text {...props} />);

    expect(screen.getAllByText('Test content')).toHaveLength(1);
  });

  /**
   * Render properties
   */
  it('should render properties of dataframe in template', async () => {
    const nameData: string[] = ['Erik', 'Natasha'];
    const ageData: number[] = [42, 38];

    const template = `| Name | Age |
| ---- | --- |
{{#each data}}
| {{name}} | {{age}} |
{{/each}}
`;

    const props: Props = {
      frame: {
        fields: [
          {
            name: 'name',
            type: FieldType.string,
            config: {},
            values: {
              length: 2,
              get: (index) => nameData[index],
              toArray: () => nameData,
            },
          },
          {
            name: 'age',
            type: FieldType.number,
            config: {},
            values: {
              length: 2,
              get: (index) => ageData[index],
              toArray: () => ageData,
            },
          },
        ],
        length: 2,
      },
      options: {
        ...DefaultOptions,
        content: template,
        defaultContent: 'Test default content',
        everyRow: false,
      },
      timeRange: {} as any,
      timeZone: '',
      replaceVariables: {} as any,
    };

    render(<Text {...props} />);

    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Erik');
    expect(screen.getAllByRole('row')[2]).toHaveTextContent('Natasha');
  });
});
