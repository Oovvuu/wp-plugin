import React from 'react';
import { shallow } from 'enzyme';
import UserKeywordItem from './';

global.wp = {
  i18n: { __: jest.fn(() => 'translated') },
};

describe('UserKeywordItem', () => {
  it('Calls remove function when clicked', () => {
    const toRemove = jest.fn();
    const wrapper = shallow(<UserKeywordItem
      keyword="keyword"
      onRemove={toRemove}
    />);

    const removeButton = wrapper.find('button');
    expect(removeButton).toHaveLength(1);
    removeButton.simulate('click');
    expect(toRemove).toHaveBeenCalled();
  });
});
