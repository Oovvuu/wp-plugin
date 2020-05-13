import React from 'react';
import { mount, shallow } from 'enzyme';
import KeywordSelector from './keywordSelector';
import GeneratedList from './generatedList';
import UserList from './userList';
import KeywordItem from './keywordItem';

const mockKeywordList = [];

describe('KeywordSelector', () => {
  it('Renders GeneratedList', () => {
    const wrapper = shallow(<KeywordSelector
      keywords={mockKeywordList}
      onKeywordsUpdated={jest.fn()}
    />);

    expect(wrapper.find(GeneratedList)).toHaveLength(1);
  });

  it('Renders UserList', () => {
    const wrapper = shallow(<KeywordSelector
      keywords={mockKeywordList}
      onKeywordsUpdated={jest.fn()}
    />);

    expect(wrapper.find(UserList)).toHaveLength(1);
  });

  it('Updates selected items from the GeneratedList correctly', () => {
    const onKeywordsUpdatedFn = jest.fn();
    const wrapper = mount(<KeywordSelector
      keywords={['keyword']}
      onKeywordsUpdated={onKeywordsUpdatedFn}
    />);

    // Make sure we have one and only one KeywordItem.
    expect(wrapper.find(KeywordItem)).toHaveLength(1);

    // Select our generated keyword and verify it is added to the selections list.
    wrapper.find('input[type="checkbox"]').at(0).simulate('change');
    expect(onKeywordsUpdatedFn.mock.calls[0][0][0]).toContain('keyword');

    // Deselect our generated keyword and verify it is removed from the selections list.
    wrapper.find('input[type="checkbox"]').at(0).simulate('change');
    expect(onKeywordsUpdatedFn.mock.calls[1][0]).toHaveLength(0);
  });
});
