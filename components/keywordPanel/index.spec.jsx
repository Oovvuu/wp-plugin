import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from 'components/actionButton';
import KeywordSelector from './keywordSelector';
import KeywordPanelWrapper from './index';

describe('KeywordPanelWrapper', () => {
  const dispatchFn = jest.fn();

  beforeEach(() => {
    global.wp = {
      apiFetch: jest.fn(),
      i18n:
        { __: jest.fn() },
      data: {
        select: () => ({ getEditedPostAttribute: jest.fn() }),
      },
    };

    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: { recommendedKeywords: [] },
      }));
  });

  afterEach(() => {
    dispatchFn.mockClear();
  });

  it('Renders KeywordSelector', () => {
    const wrapper = shallow(
      <KeywordPanelWrapper />,
    );

    expect(wrapper.find(KeywordSelector)).toHaveLength(1);
  });

  it('Renders ActionButtons', () => {
    const wrapper = shallow(
      <KeywordPanelWrapper />,
    );

    expect(wrapper.find(ActionButton)).toHaveLength(2);
  });

  describe("'Get Keywords' button", () => {
    const apiFetchFn = jest.fn(() => Promise.resolve({
      data: {
        analyseText: { wordings: ['keyword'] },
      },
    }));

    beforeEach(() => {
      global.wp = {
        apiFetch: apiFetchFn,
        data: {
          select: () => ({ getEditedPostAttribute: jest.fn() }),
        },
        i18n: { __: jest.fn() },
      };

      jest.spyOn(React, 'useContext')
        .mockImplementation(() => ({
          dispatch: dispatchFn,
          state: { recommendedKeywords: [] },
        }));
    });

    it('Dispatches FETCH_KEYWORDS action when button is clicked', () => {
      const wrapper = shallow(
        <KeywordPanelWrapper />,
      );

      wrapper.find(ActionButton).first().prop('onClickHandler')();
      expect(dispatchFn).toHaveBeenCalledWith({ type: 'FETCH_KEYWORDS' });
    });
  });
});
