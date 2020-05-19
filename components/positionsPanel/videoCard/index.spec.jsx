import React from 'react';
import { shallow } from 'enzyme';
import VideoCardWrapper from './index';

const mockVideo = {
  collection: {
    provider: {
      logo: {
        url: 'url',
      },
    },
  },
  description: 'description',
  duration: 61,
  modified: new Date().toISOString(),
  id: 'id',
  title: 'title',
};
global.wp = { i18n: { __: () => 'translated' } };

describe('VideoCardWrapper', () => {
  it('Renders logo image', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('div[role="img"][aria-label="logo"]')).toHaveLength(1);
  });

  it('Renders title', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('h4.title')).toHaveLength(1);
  });

  it('Renders video meta', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('div.meta')).toHaveLength(1);
  });

  it('Renders video description', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('p.description')).toHaveLength(1);
  });
});
