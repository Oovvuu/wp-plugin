import React from 'react';
import { shallow } from 'enzyme';
import ActionButtonWrapper from './index';
import RemoveActionButton from './remove';

describe('ActionButtonWrapper', () => {
  it('Renders ActionButtonWrapper', () => {
    const wrapper = shallow(<RemoveActionButton />);

    expect(wrapper.find(ActionButtonWrapper)).toHaveLength(1);
  });
});
