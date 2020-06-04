import React from 'react';
import { shallow } from 'enzyme';
import UserKeywordItem from './';

describe('UserKeywordItem', () => {
  it('Calls remove function when clicked', () => {
    const toRemove = jest.fn();
    const wrapper = shallow(<UserKeywordItem
      keyword="keyword"
      onRemove={toRemove}
    />);

    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click');
    expect(toRemove).toHaveBeenCalled();
  });
});
