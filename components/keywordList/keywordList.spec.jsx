import React from 'react';
import { shallow } from 'enzyme';
import KeywordList from './keywordList';

describe('KeywordList', () => {
  it('Renders', () => {
    const wrapper = shallow(<KeywordList />);

    expect(wrapper.text()).toEqual('Hello, world');
  });
});
