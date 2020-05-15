import React from 'react';
import { shallow } from 'enzyme';
import KeywordSelector from './keywordSelector';
import KeywordPanelWrapper from './index';

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

describe('KeywordPanelWrapper', () => {
  it('Renders KeywordSelector', () => {
    const wrapper = shallow(
      <KeywordPanelWrapper onSetKeywords={jest.fn()} />,
    );

    expect(wrapper.find(KeywordSelector)).toHaveLength(1);
  });
});
