import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from 'components/actionButton';
import UserLKeywordList from './index';
import KeywordList from '../keywordList';

describe('UserKeywordList', () => {
  it('Renders required child components', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: jest.fn(),
        state: { userKeywords: ['keyword'] },
      }));
    const wrapper = shallow(<UserLKeywordList />);

    expect(wrapper.find(KeywordList)).toHaveLength(1);
    expect(wrapper.find(ActionButton)).toHaveLength(1);
  });
});
