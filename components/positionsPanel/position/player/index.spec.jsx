import React from 'react';
import ReactPlayerLoader from '@brightcove/react-player-loader';
import { shallow } from 'enzyme';
import PlayerWrapper from './index';

const mockVideos = [{
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

    expect(wrapper.find(ReactPlayerLoader)).toHaveLength(1);
  });
});
