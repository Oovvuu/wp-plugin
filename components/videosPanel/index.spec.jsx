import React from 'react';
import { shallow } from 'enzyme';
import VideosPanelWrapper from './index';
import HeroSelector from './heroSelector';
import PositionTwoSelector from './positionTwoSelector';


describe('VideosPanelWrapper', () => {
  describe('Renders panels when video selections are populated', () => {
    beforeEach(() => {
      jest.spyOn(React, 'useContext')
        .mockImplementation(() => ({
          state: { selectedVideos: { hero: {}, positionTwo: [{}] } },
        }));
    });

    it('Renders a HeroSelector', () => {
      const wrapper = shallow(<VideosPanelWrapper />);

      expect(wrapper.find(HeroSelector)).toHaveLength(1);
    });

    it('Renders a PositionTwoSelector', () => {
      const wrapper = shallow(<VideosPanelWrapper />);

      expect(wrapper.find(PositionTwoSelector)).toHaveLength(1);
    });
  });

  describe('Hides panels when video selections are not populated', () => {
    it('Hides HeroSelector', () => {
      jest.spyOn(React, 'useContext')
        .mockImplementation(() => ({
          state: { selectedVideos: { positionTwo: [{}] } },
        }));
      const wrapper = shallow(<VideosPanelWrapper />);

      expect(wrapper.find(HeroSelector)).toHaveLength(0);
    });

    it('Hides PositionTwoSelector', () => {
      jest.spyOn(React, 'useContext')
        .mockImplementation(() => ({
          state: { selectedVideos: { hero: {} } },
        }));
      const wrapper = shallow(<VideosPanelWrapper />);

      expect(wrapper.find(PositionTwoSelector)).toHaveLength(0);
    });
  });
});
