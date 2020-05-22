import React from 'react';
import { shallow } from 'enzyme';
import CloseIcon from 'assets/close.svg';
import KeywordItem from './';

const mockItem = { isSelected: false, keyword: 'keyword' };

describe('KeywordItem', () => {
  it('Renders', () => {
    const wrapper = shallow(<KeywordItem item={mockItem} onToggle={jest.fn()} />);

    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('Passes correct ID onToggle()', () => {
    const toggleFn = jest.fn();
    const wrapper = shallow(<KeywordItem item={mockItem} onToggle={toggleFn} />);

    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(toggleFn).toHaveBeenCalledWith(mockItem.keyword);
  });

  describe('Has optional remove ActionButton', () => {
    it('Renders button.removeKeyword with ClearIcon if onRemove() is defined', () => {
      const wrapper = shallow(<KeywordItem
        item={mockItem}
        onRemove={jest.fn()}
        onToggle={jest.fn()}
      />);

      expect(wrapper.find('button.removeKeyword')).toHaveLength(1);
      expect(wrapper.find(CloseIcon)).toHaveLength(1);
    });
  });
});
