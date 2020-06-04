import React from 'react';
import { shallow } from 'enzyme';
import UserKeywordList from './index';
import UserKeywordItem from './userKeywordItem';

describe('UserKeywordList', () => {
  it('Renders required child components', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: jest.fn(),
        state: { userKeywords: ['keyword'] },
      }));
    const wrapper = shallow(<UserKeywordList />);

    expect(wrapper.find(UserKeywordItem)).toHaveLength(1);
  });
});
