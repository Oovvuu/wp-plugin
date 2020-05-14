import React from 'react';
import { shallow } from 'enzyme';
import VideoCardWrapper from './index';

describe('VideoCardWrapper', () => {
  it('Renders p', () => {
    const wrapper = shallow(<VideoCardWrapper />);

    expect(wrapper.find('p')).toHaveLength(1);
  });
});
