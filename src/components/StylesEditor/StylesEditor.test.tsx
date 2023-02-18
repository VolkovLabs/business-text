import { shallow } from 'enzyme';
import React from 'react';
import { StylesEditor } from './StylesEditor';

/**
 * Editor
 */
describe('Editor', () => {
  it('Should find component', async () => {
    const context = {
      options: { editor: { height: 300 } },
    };

    const getComponent = ({ ...restProps }: any) => {
      return <StylesEditor {...restProps} context={context} />;
    };

    const wrapper = shallow(getComponent({}));
    const div = wrapper.find('div');
    expect(div.exists()).toBeTruthy();
  });
});
