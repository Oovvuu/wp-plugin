import React from 'react';
import { shallow } from 'enzyme';
import getKeywords from 'services/getKeywords';
import KeywordSelector from './keywordSelector';
import KeywordPanel from './keywordPanel';

jest.spyOn(React, 'useContext')
  .mockImplementation(() => ({
    dispatch: jest.fn(),
    state: { recommendedKeywords: [] },
  }));

describe.skip('KeywordPanel', () => {
  beforeEach(() => {
    jest.spyOn('services/getKeywords');
    getKeywords.mockImplementation(() => jest.fn());
  });

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
