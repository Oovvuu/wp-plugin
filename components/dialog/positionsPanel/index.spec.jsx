import React from 'react';
import { shallow } from 'enzyme';
import PositionsPanelWrapper from './index';
import PositionWrapper from './position';

describe('PositionsPanelWrapper', () => {
  const heroEmptyReason = null;
  const positionTwoEmptyReason = null;
  const hero = [];
  const positionTwo = [];
  let shouldShowPositionsPanel = false;

  beforeEach(() => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        state: {
          isHeroEnabled: true,
          isPositionTwoEnabled: true,
          recommendedVideos: { heroEmptyReason, positionTwoEmptyReason },
          selectedVideos: { hero, positionTwo },
          shouldShowPositionsPanel,
        },
      }));
    global.wp = { i18n: { __: jest.fn() } };
  });

  it('Should hide the panel if not so flagged', () => {
    const wrapper = shallow(<PositionsPanelWrapper />);

    expect(wrapper.find(PositionWrapper)).toHaveLength(0);
  });

  it('Should show the panel if so flagged', () => {
    shouldShowPositionsPanel = true;
    const wrapper = shallow(<PositionsPanelWrapper />);

    expect(wrapper.find(PositionWrapper)).toHaveLength(2);
  });
});
