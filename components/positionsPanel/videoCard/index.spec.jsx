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

  it('Renders header', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('header')).toHaveLength(1);
  });

  it('Renders video meta', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('div.meta')).toHaveLength(1);
  });

  it('Renders video content', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('div.content')).toHaveLength(1);
  });

  it('Renders video description', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} />,
    );

    expect(wrapper.find('p.description')).toHaveLength(1);
  });
});
