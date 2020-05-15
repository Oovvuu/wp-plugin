import React from 'react';
import { shallow } from 'enzyme';
import PlayerWrapper from './index';

describe('PositionWrapper', () => {
  it('Renders p', () => {
    const wrapper = shallow(<PlayerWrapper />);

    expect(wrapper.find('p')).toHaveLength(1);
  });
});
