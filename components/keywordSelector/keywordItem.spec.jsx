import React from 'react';
import { shallow } from 'enzyme';
import KeywordItem from './keywordItem';

const id = 'uuid';
const mockItem = { id, isSelected: false, keyword: 'keyword' };

describe('KeywordItem', () => {
  it('Renders', () => {
    const wrapper = shallow(<KeywordItem item={mockItem} onToggle={jest.fn()} />);

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('Passes correct ID onToggle()', () => {
    const toggleFn = jest.fn();
    const wrapper = shallow(<KeywordItem item={mockItem} onToggle={toggleFn} />);

    wrapper.find('button').simulate('click');
    expect(toggleFn).toHaveBeenCalledWith(mockItem.id);
  });
});
