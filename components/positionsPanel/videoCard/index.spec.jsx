import React from 'react';
import { shallow } from 'enzyme';
import VideoCardWrapper from './index';

const mockVideo = { title: 'title' };
global.wp = { i18n: { __: () => 'translated' } };

describe('VideoCardWrapper', () => {
  it('Renders p', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('p')).toHaveLength(1);
  });
});
