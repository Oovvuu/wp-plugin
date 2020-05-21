import React from 'react';
import { shallow } from 'enzyme';
import uuid from 'react-uuid';
import GeneratedList from './';
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
const mockKeywordItems = keywords.reduce((carry, keyword) => {
  const id = uuid();
  return {
    ...carry,
    ...{ [id]: { id, isSelected: false, keyword } },
  };
}, {});

describe('GeneratedKeywordList', () => {
  it('Renders li for each available keyword', () => {
    const wrapper = shallow(<GeneratedList
      keywordItems={mockKeywordItems}
      onUpdate={() => true}
    />);

    expect(wrapper.find('li')).toHaveLength(keywords.length);
  });

  it('Calls onUpdate() correctly with selected object', () => {
    const updateFn = jest.fn();
    const id = 'uuid';
    const items = { [id]: { id, isSelected: false, keyword: 'keyword' } };
    const wrapper = shallow(<GeneratedList keywordItems={items} onUpdate={updateFn} />);

    const expected = { id: 'uuid', isSelected: false, keyword: 'keyword' };
    wrapper.find(KeywordItem).at(0).prop('onToggle')(expected.id);
    expect(updateFn.mock.calls[0][0].isSelected).toBeTruthy();
    expect(updateFn.mock.calls[0][0].id).toEqual(expected.id);
  });

  it('Calls onUpdate() correctly with deselected object', () => {
    const updateFn = jest.fn();
    const id = 'uuid';
    const items = { [id]: { id, isSelected: true, keyword: 'keyword' } };
    const wrapper = shallow(<GeneratedList keywordItems={items} onUpdate={updateFn} />);

    const expected = items[id];
    wrapper.find(KeywordItem).at(0).prop('onToggle')(expected.id);
    expect(updateFn.mock.calls[0][0].isSelected).toBeFalsy();
    expect(updateFn.mock.calls[0][0].keyword).toEqual(expected.keyword);
  });
});
