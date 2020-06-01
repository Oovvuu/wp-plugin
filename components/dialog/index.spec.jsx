import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from 'components/actionButton';
import * as saveState from 'services/saveState';
import DialogWrapper from './index';

describe('DialogWrapper', () => {
  const dispatchFn = jest.fn();

  beforeEach(() => {
    global.wp = { i18n: { __: jest.fn() } };
  });

  afterEach(() => {
    dispatchFn.mockClear();
  });

  it('Dispatches FETCH_KEYWORDS action when button is clicked and isLoadedFromMeta is false', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: {
          isLoadedFromMeta: false,
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

  it("Doesn't dispatch FETCH_KEYWORDS if isLoadedFromMeta is true", () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: {
          isLoadedFromMeta: true,
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

  describe('Save and close behavior', () => {
    let saveStateSpy;

    beforeEach(() => {
      saveStateSpy = jest.spyOn(saveState, 'default')
        .mockImplementationOnce(() => Promise.resolve({ data: 'state' }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Makes API call to save state', () => {
      const wrapper = shallow(
        <DialogWrapper />,
      );

      wrapper.find(ActionButton).prop('onClickHandler')();
      return new Promise((resolve) => setImmediate(resolve)).then(() => {
        expect(saveStateSpy).toHaveBeenCalled();
      });
    });

    it('Dispatches RESET_STATE action', () => {
      const wrapper = shallow(<DialogWrapper />);

      wrapper.find(ActionButton).prop('onClickHandler')();
      return new Promise((resolve) => setImmediate(resolve)).then(() => {
        expect(dispatchFn).toHaveBeenCalledWith({
          type: 'RESET_STATE',
          payload: 'state',
        });
      });
    });
  });
});
