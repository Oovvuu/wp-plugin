import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from 'components/actionButton';
import UserKeywordList from './index';
import UserKeywordItem from './userKeywordItem';

describe('UserKeywordList', () => {
  // @todo fix it don't skip it.
  it.skip('Renders required child components', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: jest.fn(),
        state: { userKeywords: ['keyword'] },
      }));
    const wrapper = shallow(<UserKeywordList />);

    expect(wrapper.find(UserKeywordItem)).toHaveLength(1);
    expect(wrapper.find(ActionButton)).toHaveLength(1);
  });
});
