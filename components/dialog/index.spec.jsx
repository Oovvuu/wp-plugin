import React from 'react';
import { shallow, mount } from 'enzyme';
import ActionButton from 'components/shared/actionButton';
import * as saveState from 'services/saveState';
import DialogWrapper from './index';
import Dialog from './dialog';

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
          selectedVideos: {
            positionTwo: {},
          },
          sidebarSelectedHeroVideo: {},
        },
      }));

    const wrapper = shallow(
      <DialogWrapper />,
    );

    wrapper.find(ActionButton).first().simulate('clickHandler');
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
          selectedVideos: {
            positionTwo: {},
          },
          sidebarSelectedHeroVideo: {},
        },
      }));

    const wrapper = shallow(
      <DialogWrapper />,
    );

    wrapper.find(ActionButton).first().simulate('clickHandler');
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
      const wrapper = mount(<Dialog
        isOpen={false}
        isLoading={false}
        closeDialog={() => { jest.fn(); }}
      />);

      wrapper.find(ActionButton).first().simulate('click');
      return new Promise((resolve) => setImmediate(resolve)).then(() => {
        expect(saveStateSpy).toHaveBeenCalled();
      });
    });

    it('Dispatches RESET_STATE action', () => {
      const wrapper = mount(<Dialog
        isOpen={false}
        isLoading={false}
        closeDialog={() => { jest.fn(); }}
      />);

      wrapper.find(ActionButton).first().simulate('click');
      return new Promise((resolve) => setImmediate(resolve)).then(() => {
        expect(dispatchFn).toHaveBeenCalledWith({
          type: 'RESET_STATE',
          payload: 'state',
        });
      });
    });
  });
});
