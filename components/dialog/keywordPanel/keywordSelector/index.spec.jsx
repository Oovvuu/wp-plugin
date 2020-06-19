import React from 'react';
import { shallow } from 'enzyme';
import KeywordSelector from './';
import GeneratedList from './keywordList';
import UserList from './userKeywordList';

global.wp = { i18n: { __: () => 'translated' } };

describe('KeywordSelector', () => {
  it('Renders GeneratedList', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: jest.fn(),
        state: { recommendedKeywords: [] },
      }));

    const wrapper = shallow(<KeywordSelector />);

    expect(wrapper.find(GeneratedList)).toHaveLength(1);
  });

  it('Renders UserList', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: jest.fn(),
        state: { recommendedKeywords: [] },
      }));

    const wrapper = shallow(<KeywordSelector />);

    expect(wrapper.find(UserList)).toHaveLength(1);
  });
});
