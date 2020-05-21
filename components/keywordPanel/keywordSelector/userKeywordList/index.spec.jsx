import React from 'react';
import { shallow } from 'enzyme';
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
  it('Renders KeywordList', () => {
    const wrapper = shallow(<UserLKeywordList
      keywordItems={mockKeywordItems}
      onUpdate={() => true}
    />);

    expect(wrapper.find(KeywordList)).toHaveLength(Object.keys(mockKeywordItems).length);
  });
});
