import '@testing-library/jest-dom';
import React from 'react';
import { FieldType } from '@grafana/data';
import { render, screen } from '@testing-library/react';
import { DefaultOptions } from '../../constants';
import { Props, Text } from './Text';

/**
 * Text
 */
describe('<Text />', () => {
  /**
   * Default Content
   */
  test('should render default content when there is no dataframe', async () => {
    const props: Props = {
      options: {
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: true,
        editor: DefaultOptions.editor,
      },
    };
    render(<Text {...props} />);

    expect(screen.getByText('Test default content')).toBeInTheDocument();
  });

  /**
   * Render content twice
   */
  test('should render content twice when there is a dataframe and everyRow is true', async () => {
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
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: true,
        editor: DefaultOptions.editor,
      },
    };
    render(<Text {...props} />);

    expect(screen.getAllByText('Test content')).toHaveLength(2);
  });

  /**
   * Render content once
   */
  test('should render content once when there is a dataframe and everyRow is false', async () => {
    const props: Props = {
      frame: {
        fields: [],
        length: 2,
      },
      options: {
        content: 'Test content',
        defaultContent: 'Test default content',
        everyRow: false,
        editor: DefaultOptions.editor,
      },
    };
    render(<Text {...props} />);

    expect(screen.getAllByText('Test content')).toHaveLength(1);
  });

  /**
   * Render properties
   */
  test('should render properties of dataframe in template', async () => {
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
        content: template,
        defaultContent: 'Test default content',
        everyRow: false,
        editor: DefaultOptions.editor,
      },
    };
    render(<Text {...props} />);

    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Erik');
    expect(screen.getAllByRole('row')[2]).toHaveTextContent('Natasha');
  });
});
