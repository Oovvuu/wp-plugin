import React from 'react';
import { mount, shallow } from 'enzyme';
import TopicsList from './index';
import TopicItem from './topicItem/index';

describe('TopicsList', () => {
  const dispatchFn = jest.fn();
  let items;

  beforeEach(() => {
    items = [
      {
        approximateTotalCount: '5',
        keywordMatch: 'match',
        previewImage: { url: 'url' },
      },
    ];

    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: { selectedTopics: [] },
      }));
  });

  it('Renders TopicItem for each item in list', () => {
    const wrapper = shallow(<TopicsList items={items} />);

    expect(wrapper.find(TopicItem)).toHaveLength(items.length);
  });

  it('Correctly dispatches SELECT_ALTERNATE_SEARCH on TopicItem click', () => {
    const wrapper = mount(<TopicsList items={items} />);
    const [item] = items;

    wrapper.find('input[type="checkbox"]').first().simulate('change', { target: { checked: true } });
    expect(dispatchFn).toHaveBeenCalledWith({ type: 'CLEAR_SELECTED_TOPICS' });
    expect(dispatchFn).toHaveBeenCalledWith({ type: 'UPDATE_SELECTED_TOPICS', payload: [item] });
  });
});
