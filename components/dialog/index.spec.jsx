import React from 'react';
import { shallow } from 'enzyme';
import DialogWrapper from './index';

global.wp = { i18n: { __: jest.fn() } };

describe('DialogWrapper', () => {
  it('Dispatches FETCH_KEYWORDS action when button is clicked and no embeds exist', () => {
    const dispatchFn = jest.fn();
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: {
          embeds: { hero: null, positionTwo: null },
          recommendedKeywords: ['keyword'],
        },
      }));

    const wrapper = shallow(
      <DialogWrapper />,
    );

    wrapper.find('button[aria-controls="oovvuu-dialog-wrapper"]').simulate('click');
    expect(dispatchFn).toHaveBeenCalledWith({ type: 'FETCH_KEYWORDS' });
  });

  it("Doesn't dispatch FETCH_KEYWORDS if embeds exist", () => {
    const dispatchFn = jest.fn();
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: {
          embeds: { hero: 'exists', positionTwo: 'exists' },
          recommendedKeywords: ['keyword'],
        },
      }));

    const wrapper = shallow(
      <DialogWrapper />,
    );

    wrapper.find('button[aria-controls="oovvuu-dialog-wrapper"]').simulate('click');
    expect(dispatchFn).not.toHaveBeenCalled();
  });
});
