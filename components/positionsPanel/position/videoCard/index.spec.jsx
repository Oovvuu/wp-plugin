import React from 'react';
import { shallow } from 'enzyme';
import VideoCardWrapper from './index';

const mockVideo = {
  collection: {
    provider: {
      logo: {
        url: 'url',
      },
      legalName: 'Legal Name',
    },
  },
  summary: 'summary',
  duration: 61,
  modified: new Date().toISOString(),
  id: 'id',
  title: 'title',
};
global.wp = { i18n: { __: () => 'translated' } };

describe('VideoCardWrapper', () => {
  it('Renders logo image', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} index={Number(0)} />,
    );

    expect(wrapper.find('div img[alt="Legal Name"]')).toHaveLength(1);
  });

  it('Renders title', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} index={Number(0)} />,
    );

    expect(wrapper.find('h4.title')).toHaveLength(1);
  });

  it('Renders video meta', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} index={Number(0)} />,
    );

    expect(wrapper.find('div.meta')).toHaveLength(1);
  });

  it('Renders video description', () => {
    const wrapper = shallow(
      <VideoCardWrapper positionKey="hero" video={mockVideo} index={Number(0)} />,
    );

    expect(wrapper.find('p.description')).toHaveLength(1);
  });
});
