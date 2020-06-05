import React from 'react';
import { shallow } from 'enzyme';
import TopicsPanelWrapper from './index';
import TopicsSelectorWrapper from './topicsSelector';

describe('TopicsPanelWrapper', () => {
  beforeEach(() => {
    global.wp = { i18n: { __: jest.fn() } };
  });

  it('Hides the panel when API result has no alternateSearches', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        state: {
          recommendedVideos: {
            alternateSearches: [],
          },
        },
      }));

    const wrapper = shallow(<TopicsPanelWrapper />);

    expect(wrapper.find(TopicsSelectorWrapper)).toHaveLength(0);
  });

  it('Shows the panel when API result has alternateSearches', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        state: {
          recommendedVideos: {
            alternateSearches: ['alternate'],
          },
        },
      }));

    const wrapper = shallow(<TopicsPanelWrapper />);

    expect(wrapper.find(TopicsSelectorWrapper)).toHaveLength(1);
  });
});
