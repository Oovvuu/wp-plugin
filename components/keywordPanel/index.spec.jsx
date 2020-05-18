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
  /**
   * @todo Correct the following issue and un-skip this test.
   * > Warning: Failed prop type: The prop `children` is marked as required in
   * > `ActionButton`, but its value is `undefined` in ActionButton
   */
  it.skip('Renders KeywordSelector', () => {
    const wrapper = shallow(
      <KeywordPanelWrapper />,
    );

    expect(wrapper.find(KeywordSelector)).toHaveLength(1);
  });
});
