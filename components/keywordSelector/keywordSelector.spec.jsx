import React from 'react';
import { shallow } from 'enzyme';
import KeywordSelector from './keywordSelector';
import GeneratedList from './generatedList';
import KeywordItem from './keywordItem';

const mockKeywordList = [];
const mockPostTitle = 'Post Title';
const onFetchVideosFn = jest.fn();
const onUpdateFn = jest.fn();

describe('KeywordSelector', () => {
  it('Renders KeywordList', () => {
    const wrapper = shallow(<KeywordSelector
      keywords={mockKeywordList}
      onFetchVideos={onFetchVideosFn}
      onUpdateKeywords={onUpdateFn}
      postTitle={mockPostTitle}
    />);

    expect(wrapper.find(GeneratedList)).toHaveLength(1);
  });

  it.skip('Adds selected KeywordItem correctly onUpdate()', () => {
    // const updateFn = jest.fn();
    // const wrapper = shallow(<KeywordSelector
    //   keywords={mockKeywordList}
    //   onFetchVideos={onFetchVideosFn}
    //   onUpdateKeywords={onUpdateFn}
    //   postTitle={mockPostTitle}
    // />);
  });
});
