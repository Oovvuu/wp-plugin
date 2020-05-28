import React from 'react';
import { shallow } from 'enzyme';
import EffectsManager from './effectsManager';

jest.spyOn(React, 'useEffect')
  .mockImplementation((effect) => effect());

describe('EffectsManager', () => {
  it('Fetches keywords on FETCH_KEYWORDS action', async () => {
    const apiFetchFn = jest.fn(() => Promise.resolve({
      data: {
        analyseText: { wordings: ['keyword'] },
      },
    }));
    const dispatchFn = jest.fn();
    const mockState = {
      recommendedKeywords: [],
      recommendedVideos: {
        hero: [],
        heroSecondary: [],
        positionTwo: [],
        positionTwoSecondary: [],
      },
    };
    global.wp = {
      apiFetch: apiFetchFn,
      data: {
        select: () => ({ getEditedPostAttribute: jest.fn() }),
      },
      i18n: { __: jest.fn() },
    };
    const wrapper = shallow(
      <EffectsManager
        dispatch={dispatchFn}
        state={mockState}
      >
        <p>Hello, world!</p>
      </EffectsManager>,
    );

    wrapper.setProps({ actionType: 'FETCH_KEYWORDS' });
    expect(apiFetchFn).toHaveBeenCalledTimes(1);
    return new Promise((resolve) => setImmediate(resolve)).then(() => {
      expect(dispatchFn).toHaveBeenCalledWith({
        payload: ['keyword'],
        type: 'UPDATE_RECOMMENDED_KEYWORDS',
      });
    });
  });
});
