import React from 'react';
import { shallow } from 'enzyme';
import TopicItem from './index';

describe('TopicItem', () => {
  const item = { approximateTotalCount: '1', keywordMatch: 'keywordMatch', previewImage: { url: 'url' } };

  it('Calls onToggle on click', () => {
    const onToggleFn = jest.fn();
    const wrapper = shallow(<TopicItem
      item={item}
      onToggle={onToggleFn}
    />);

    wrapper.find('button').simulate('click');
    expect(onToggleFn).toHaveBeenCalledWith(item);
  });
});
