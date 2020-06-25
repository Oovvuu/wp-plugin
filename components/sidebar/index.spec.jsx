import React from 'react';
import { shallow } from 'enzyme';
import SidebarWrapper from './index';
import HeroCardWrapper from './heroCard';

describe('SidebarWrapper', () => {
  beforeEach(() => {
    global.wp = { i18n: { __: jest.fn() } };
  });

  it('Renders HeroCard when sidebar has selected hero video', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      state: { sidebarSelectedHeroVideo: { id: '1' } },
    }));
    const wrapper = shallow(<SidebarWrapper />);

    expect(wrapper.find(HeroCardWrapper)).toHaveLength(1);
  });

  it('Hides HeroCard when no selected hero video', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      state: { sidebarSelectedHeroVideo: {} },
    }));
    const wrapper = shallow(<SidebarWrapper />);

    expect(wrapper.find(HeroCardWrapper)).toHaveLength(0);
  });
});
