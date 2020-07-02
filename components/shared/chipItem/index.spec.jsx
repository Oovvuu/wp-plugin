import React from 'react';
import { shallow } from 'enzyme';
import ChipItem from './';

global.wp = {
  i18n: { __: jest.fn(() => 'translated') },
};

describe('ChipItem', () => {
  it('Calls remove function when clicked', () => {
    const handleRemove = jest.fn();
    const wrapper = shallow(<ChipItem
      keyword="keyword"
      handleRemove={handleRemove}
      flash={false}
    />);

    const removeButton = wrapper.find('button');
    expect(removeButton).toHaveLength(1);
    removeButton.simulate('click');
    expect(handleRemove).toHaveBeenCalled();
  });
});
