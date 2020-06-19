import React from 'react';
import { shallow } from 'enzyme';
import PlayerWraper from 'components/positionsPanel/position/player';
import PositionToggle from 'components/positionsPanel/position/positionToggle';
import PositionWrapper from './index';

global.wp = { i18n: { __: () => 'translated' } };
const mockVideos = [{
  id: '1',
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
  modified: Date.now().toString(),
  preview: {
    brightcoveVideoId: 'xxx',
    brightcovePlayerId: 'xxx',
    brightcoveAccountId: 'xxx',
  },
  thumbnail: { url: 'url' },
  title: 'title',
}];

describe('PositionWrapper', () => {
  it('Renders h3', () => {
    const wrapper = shallow(
      <PositionWrapper positionKey="hero" title="title" videos={mockVideos} />,
    );

    expect(wrapper.find('h3')).toHaveLength(1);
  });

  it('Renders PositionToggle', () => {
    const wrapper = shallow(
      <PositionWrapper positionKey="hero" title="title" videos={mockVideos} />,
    );

    expect(wrapper.find(PositionToggle)).toHaveLength(1);
  });

  it('Renders PlayerWrapper', () => {
    const wrapper = shallow(
      <PositionWrapper positionKey="hero" title="title" videos={mockVideos} />,
    );

    expect(wrapper.find(PlayerWraper)).toHaveLength(1);
  });
});
