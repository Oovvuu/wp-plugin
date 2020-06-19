import React from 'react';
import { shallow } from 'enzyme';
import Player from './player';
import PlayerWrapper from './index';

const mockVideos = [{
  id: '1',
  preview: {
    brightcoveVideoId: 'xxx',
    brightcovePlayerId: 'xxx',
    brightcoveAccountId: 'xxx',
  },
  thumbnail: { url: 'url' },
}];

describe('PositionWrapper', () => {
  it('Renders ReactPlayerLoader', () => {
    const wrapper = shallow(
      <PlayerWrapper videos={mockVideos} />,
    );
    expect(wrapper.find(Player)).toHaveLength(1);
  });
});
