import React from 'react';
import { shallow } from 'enzyme';
import TopicsList from './index';
import TopicItem from './topicItem/index';

describe('TopicsList', () => {
  let items;

  beforeEach(() => {
    items = [
      {
        approximateTotalCount: 5,
        keywordMatch: 'match',
        previewImage: { url: 'url' },
      },
    ];
  });

  it('Renders TopicItem for each item in list', () => {
    const wrapper = shallow(<TopicsList items={items} />);

    expect(wrapper.find(TopicItem)).toHaveLength(items.length);
  });
});
