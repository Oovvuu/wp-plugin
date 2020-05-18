import React from 'react';
import { shallow } from 'enzyme';
import VideoCardWrapper from './index';

const mockVideo = { title: 'title' };

describe('VideoCardWrapper', () => {
  it('Renders p', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('p')).toHaveLength(1);
  });
});
