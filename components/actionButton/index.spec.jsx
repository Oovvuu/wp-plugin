import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from './index';

describe('ActionButton', () => {
  it('Renders button', () => {
    const clickHandler = jest.fn();

    const wrapper = shallow(
      <ActionButton
        onClickHandler={clickHandler}
      >
        <span>Hello, world!</span>
      </ActionButton>,
    );

    expect(wrapper.find('button')).toHaveLength(1);
  });
});
