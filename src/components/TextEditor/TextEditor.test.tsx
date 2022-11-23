import { shallow } from 'enzyme';
import React from 'react';
import { DefaultOptions } from '../../constants';
import { TextEditor } from './TextEditor';

/**
 * Editor
 */
describe('Editor', () => {
  it('Should find component', async () => {
    const context = {
      options: { editor: DefaultOptions.editor },
    };

    const getComponent = ({ ...restProps }: any) => {
      return <TextEditor {...restProps} context={context} />;
    };

    const wrapper = shallow(getComponent({}));
    const div = wrapper.find('div');
    expect(div.exists()).toBeTruthy();
  });
});
