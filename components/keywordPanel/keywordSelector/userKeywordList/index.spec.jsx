import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from 'components/actionButton';
import UserLKeywordList from './index';
import KeywordList from '../keywordList';

const mockKeywordItems = {
  a: {
    id: 'a',
    isSelected: true,
    keyword: 'keyword',
    type: 'user',
  },
};

describe('UserKeywordList', () => {
  it('Renders required child components', () => {
    const wrapper = shallow(<UserLKeywordList
      keywordItems={mockKeywordItems}
      onMutate={jest.fn()}
      onUpdate={() => true}
    />);

    expect(wrapper.find(KeywordList)).toHaveLength(Object.keys(mockKeywordItems).length);
    expect(wrapper.find(ActionButton)).toHaveLength(1);
  });
});
