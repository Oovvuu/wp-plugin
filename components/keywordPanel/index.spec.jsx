import React from 'react';
import { shallow } from 'enzyme';
import KeywordSelector from './keywordSelector';
import KeywordPanelWrapper from './index';

jest.spyOn(React, 'useContext')
  .mockImplementation(() => ({
    dispatch: jest.fn(),
    state: { recommendedKeywords: [], selectedKeywords: [], userKeywords: [] },
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
    const mockOnHandleDisplayPanels = jest.fn();
    const wrapper = shallow(
      <KeywordPanelWrapper onHandleDisplayPanels={mockOnHandleDisplayPanels} />,
    );

    expect(wrapper.find(KeywordSelector)).toHaveLength(1);
  });
});
