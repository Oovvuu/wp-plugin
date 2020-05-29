import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from 'components/actionButton';
import DialogWrapper from './index';

describe('DialogWrapper', () => {
  const dispatchFn = jest.fn();

  beforeEach(() => {
    global.wp = { i18n: { __: jest.fn() } };
  });

  afterEach(() => {
    dispatchFn.mockClear();
  });

  it('Dispatches FETCH_KEYWORDS action when button is clicked and no embeds exist', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: {
          embeds: { hero: null, positionTwo: null },
          recommendedKeywords: ['keyword'],
          isLoading: false,
        },
      }));

    const wrapper = shallow(
      <DialogWrapper />,
    );

    wrapper.find('button[aria-controls="oovvuu-dialog-wrapper"]').simulate('click');
    expect(dispatchFn).toHaveBeenCalledWith({ type: 'FETCH_KEYWORDS' });
  });

  it("Doesn't dispatch FETCH_KEYWORDS if embeds exist", () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: {
          embeds: { hero: 'exists', positionTwo: 'exists' },
          recommendedKeywords: ['keyword'],
          isLoading: false,
        },
      }));

    const wrapper = shallow(
      <DialogWrapper />,
    );

    wrapper.find('button[aria-controls="oovvuu-dialog-wrapper"]').simulate('click');
    expect(dispatchFn).not.toHaveBeenCalled();
  });

  describe('Close modal behavior', () => {
    const apiFetchFn = jest.fn(() => Promise.resolve({
      success: true,
      embeds: {},
    }));

    beforeEach(() => {
      global.wp = { apiFetch: apiFetchFn, i18n: { __: jest.fn() } };
    });

    it('Makes API call to save state', () => {
      const wrapper = shallow(
        <DialogWrapper />,
      );

      wrapper.find(ActionButton).prop('onClickHandler')();
      expect(apiFetchFn).toHaveBeenCalled();
    });

    it('Dispatches UPDATE_EMBEDS action', () => {
      const wrapper = shallow(<DialogWrapper />);

      wrapper.find(ActionButton).prop('onClickHandler')();
      return new Promise((resolve) => setImmediate(resolve)).then(() => {
        // Payload is transformed result.
        expect(dispatchFn).toHaveBeenCalledWith({
          type: 'UPDATE_EMBEDS',
          payload: { hero: null, positionTwo: null },
        });
      });
    });
  });
});
