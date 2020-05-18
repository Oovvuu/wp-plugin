import React from 'react';
import { shallow } from 'enzyme';
import PositionToggleWrapper from './index';

describe('PositionToggleWrapper', () => {
  it('Renders a checkbox', () => {
    const wrapper = shallow(<PositionToggleWrapper />);

    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });
});
