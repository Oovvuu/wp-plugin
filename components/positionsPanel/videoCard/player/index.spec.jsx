import React from 'react';
import { shallow } from 'enzyme';
import PlayerWrapper from './index';

describe('PositionWrapper', () => {
  it('Renders p', () => {
    const preview = {
      brightcoveVideoId: 'xxx',
      brightcovePlayerId: 'xxx',
      brightcoveAccountId: 'xxx',
    };
    const wrapper = shallow(
      <PlayerWrapper
        thumbnailUrl="url"
        preview={preview}
      />,
    );

    expect(wrapper.find('ReactPlayerLoader')).toHaveLength(1);
  });
});
