import React from 'react';
import { shallow } from 'enzyme';
import ActionButtonWrapper from './index';

describe('ActionButtonWrapper', () => {
  it('Renders button', () => {
    const wrapper = shallow(
      <ActionButtonWrapper>
        <span>Hello, world!</span>
      </ActionButtonWrapper>,
    );

    expect(wrapper.find('button')).toHaveLength(1);
  });
});
