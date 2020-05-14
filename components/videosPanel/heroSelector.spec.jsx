import React from 'react';
import { shallow } from 'enzyme';
import HeroSelector from './heroSelector';

jest.spyOn(React, 'useContext')
  .mockImplementation(() => ({
    state: { recommendedVideos: { hero: [] } },
  }));

describe('HeroSelector', () => {
  it('Renders one h3 elements', () => {
    const wrapper = shallow(<HeroSelector />);

    expect(wrapper.find('h3')).toHaveLength(1);
  });
});
