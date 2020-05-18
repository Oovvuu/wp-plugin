import React from 'react';
import { shallow } from 'enzyme';
import VideoCardWrapper from './index';

describe('VideoCardWrapper', () => {
  it('Renders p', () => {
    const preview = {
      brightcoveVideoId: 'xxx',
      brightcovePlayerId: 'xxx',
      brightcoveAccountId: 'xxx',
    };
    const wrapper = shallow(
      <VideoCardWrapper
        id="1"
        thumbnail={{ url: 'url' }}
        title="title"
        preview={preview}
      />,
    );

    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('PlayerWrapper')).toHaveLength(1);
  });
});
