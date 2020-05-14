import React from 'react';
import { shallow } from 'enzyme';
import VideosPanel from './videosPanel';
import HeroSelector from './heroSelector';
import PositionTwoSelector from './positionTwoSelector';

describe('VideosPanel', () => {
  it('Renders a HeroSelector', () => {
    const wrapper = shallow(<VideosPanel />);

    expect(wrapper.find(HeroSelector)).toHaveLength(1);
  });

  it('Renders a PositionTwoSelector', () => {
    const wrapper = shallow(<VideosPanel />);

    expect(wrapper.find(PositionTwoSelector)).toHaveLength(1);
  });
});
