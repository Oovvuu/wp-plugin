import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from './index';

describe('ActionButton', () => {
  it('Renders button', () => {
    const wrapper = shallow(
      <ActionButton
        onClickHandler={() => {}}
      >
        <span>Hello, world!</span>
      </ActionButton>,
    );

    expect(wrapper.find('button')).toHaveLength(1);
  });
});
