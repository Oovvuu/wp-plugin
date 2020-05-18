import React from 'react';
import { shallow } from 'enzyme';
import VideosPanelWrapper from './index';
import HeroSelector from './heroSelector';
import PositionTwoSelector from './positionTwoSelector';

jest.spyOn(React, 'useContext')
  .mockImplementation(() => ({
    state: { selectedVideos: { hero: {}, positionTwo: [{}] } },
  }));

describe('VideosPanelWrapper', () => {
  it('Renders a HeroSelector', () => {
    const wrapper = shallow(<VideosPanelWrapper />);

    expect(wrapper.find(HeroSelector)).toHaveLength(1);
  });

  it('Renders a PositionTwoSelector', () => {
    const wrapper = shallow(<VideosPanelWrapper />);

    expect(wrapper.find(PositionTwoSelector)).toHaveLength(1);
  });
});
