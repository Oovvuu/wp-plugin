import React from 'react';
import { shallow } from 'enzyme';
import KeywordSelector from './keywordSelector';
import KeywordPanel from './keywordPanel';

describe('KeywordPanel', () => {
  it('Renders KeywordSelector', () => {
    const wrapper = shallow(
      <KeywordPanel
        keywords={[]}
        onFetchKeywords={jest.fn()}
        onFetchVideos={jest.fn()}
        onSetKeywords={jest.fn()}
      />,
    );

    expect(wrapper.find(KeywordSelector)).toHaveLength(1);
  });
});
