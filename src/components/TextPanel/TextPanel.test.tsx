import React from 'react';
import { render, screen } from '@testing-library/react';
import { toDataFrame } from '@grafana/data';
import { TestIds } from '../../constants';
import { TextPanel } from './TextPanel';

/**
 * Panel
 */
describe('Panel', () => {
  it('Should find component', async () => {
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

    render(getComponent({}));

    expect(screen.getByTestId(TestIds.panel.root)).toBeInTheDocument();
  });
});
