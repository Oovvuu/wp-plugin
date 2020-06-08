import React from 'react';
import { shallow } from 'enzyme';
import KeywordItem from './';

describe('KeywordItem', () => {
  it('Renders', () => {
    const wrapper = shallow(<KeywordItem
      keyword="keyword"
      isSelected={false}
      onToggle={jest.fn()}
    />);

    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('Passes correct ID onToggle()', () => {
    const toggleFn = jest.fn();
    const wrapper = shallow(<KeywordItem
      keyword="keyword"
      isSelected={false}
      onToggle={toggleFn}
    />);

    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(toggleFn).toHaveBeenCalledWith('keyword');
  });
});
