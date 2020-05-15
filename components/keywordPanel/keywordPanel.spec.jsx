import React from 'react';
import { shallow } from 'enzyme';
import KeywordSelector from './keywordSelector';
import KeywordPanel from './keywordPanel';

jest.spyOn(React, 'useContext')
  .mockImplementation(() => ({
    dispatch: jest.fn(),
    state: { recommendedKeywords: [] },
  }));

/**
 * Mocks out globals used by services that this component depends on:
 *   - getKeywords
 *   - getPostAttribute
 *   - getVideos
 */
global.wp = {
  apiFetch: jest.fn(),
  i18n:
    { __: jest.fn() },
  data: {
    select: () => ({ getEditedPostAttribute: jest.fn() }),
  },
};

describe('KeywordPanel', () => {
  it('Renders KeywordSelector', () => {
    const wrapper = shallow(
      <KeywordPanel onSetKeywords={jest.fn()} />,
    );

    expect(wrapper.find(KeywordSelector)).toHaveLength(1);
  });
});
