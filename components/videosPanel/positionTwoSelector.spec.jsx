import React from 'react';
import { shallow } from 'enzyme';
import PositionTwoSelector from './positionTwoSelector';

jest.spyOn(React, 'useContext')
  .mockImplementation(() => ({
    state: { recommendedVideos: { positionTwo: [] } },
  }));

describe('PositionTwoSelector', () => {
  it('Renders one h3 elements', () => {
    const wrapper = shallow(<PositionTwoSelector />);

    expect(wrapper.find('h3')).toHaveLength(1);
  });
});
