import React from 'react';
import { shallow } from 'enzyme';
import PositionToggleWrapper from './index';

describe('PositionToggleWrapper', () => {
  it('Renders p', () => {
    const wrapper = shallow(<PositionToggleWrapper />);

    expect(wrapper.find('p')).toHaveLength(1);
  });
});
