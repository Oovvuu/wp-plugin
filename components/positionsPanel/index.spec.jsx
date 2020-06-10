import React from 'react';
import { shallow } from 'enzyme';
import PositionsPanelWrapper from './index';
import PositionWrapper from './position';

describe('PositionsPanelWrapper', () => {
  let heroEmptyReason = null;
  let positionTwoEmptyReason = null;
  let hero = [];
  let positionTwo = [];

  beforeEach(() => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        state: {
          isHeroEnabled: true,
          isPositionTwoEnabled: true,
          recommendedVideos: { heroEmptyReason, positionTwoEmptyReason },
          selectedVideos: { hero, positionTwo },
        },
      }));
    global.wp = { i18n: { __: jest.fn() } };
  });

  it('Should hide the panel if no videos data exists', () => {
    const wrapper = shallow(<PositionsPanelWrapper />);

    expect(wrapper.find(PositionWrapper)).toHaveLength(0);
  });

  it('Should show the panel if heroEmptyReason exists', () => {
    heroEmptyReason = 'some reason';
    const wrapper = shallow(<PositionsPanelWrapper />);

    expect(wrapper.find(PositionWrapper)).toHaveLength(2);
  });

  it('Should show the panel if positionTwoEmptyReason exists', () => {
    positionTwoEmptyReason = 'some reason';
    const wrapper = shallow(<PositionsPanelWrapper />);

    expect(wrapper.find(PositionWrapper)).toHaveLength(2);
  });

  it('Should show the panel if hero videos exist', () => {
    hero = [{ id: 'id' }];
    const wrapper = shallow(<PositionsPanelWrapper />);

    expect(wrapper.find(PositionWrapper)).toHaveLength(2);
  });

  it('Should show the panel if positionTwo videos exist', () => {
    positionTwo = [{ id: 'id' }];
    const wrapper = shallow(<PositionsPanelWrapper />);

    expect(wrapper.find(PositionWrapper)).toHaveLength(2);
  });
});
