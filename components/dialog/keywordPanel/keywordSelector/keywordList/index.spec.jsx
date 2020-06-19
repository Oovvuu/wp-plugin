import React from 'react';
import { shallow } from 'enzyme';
import KeywordList from './';
import KeywordItem from './keywordItem';

const keywords = [
  'coronavirus',
  'states',
  'scientists',
  'working people',
  'small business owners',
  'money',
  'economic ruin',
  'dozens',
  'the pain',
  'even minimal criteria',
  'coronavirus cases',
  'disaster',
];

const selectedKeywords = [
  'coronavirus',
];

const dispatchFn = jest.fn();

global.wp = {
  i18n: {
    __: jest.fn(() => 'translated'),
    sprintf: jest.fn(),
    _n: jest.fn(),
  },
};

jest.spyOn(React, 'useContext')
  .mockImplementation(() => ({
    dispatch: dispatchFn,
    state: { selectedKeywords },
  }));

describe('GeneratedKeywordList', () => {
  it('Renders li for each available keyword', () => {
    const wrapper = shallow(<KeywordList
      keywordItems={keywords}
    />);

    expect(wrapper.find('li')).toHaveLength(keywords.length);
  });
});

describe('Toggle keywords', () => {
  const wrapper = shallow(<KeywordList keywordItems={keywords} />);
  const onToggle = wrapper.find(KeywordItem).at(0).prop('onToggle');

  it('Correctly selects a keyword', () => {
    onToggle('scientists');
    expect(dispatchFn).toHaveBeenCalledWith({
      payload: [...selectedKeywords, 'scientists'],
      type: 'UPDATE_SELECTED_KEYWORDS',
    });
  });

  it('Correctly deselects a keyword', () => {
    onToggle('coronavirus');
    expect(dispatchFn).toHaveBeenCalledWith({
      payload: [],
      type: 'UPDATE_SELECTED_KEYWORDS',
    });
  });
});
