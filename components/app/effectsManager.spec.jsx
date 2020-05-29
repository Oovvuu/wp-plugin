import React from 'react';
import { shallow } from 'enzyme';
import EffectsManager from './effectsManager';

jest.spyOn(React, 'useEffect')
  .mockImplementation((effect) => effect());

describe('EffectsManager', () => {
  let apiFetchFn;
  let dispatchFn;

  beforeEach(() => {
    apiFetchFn = jest.fn(() => Promise.resolve({
      data: {
        analyseText: { wordings: ['keyword'] },
      },
    }));
    dispatchFn = jest.fn();
  });

  afterEach(() => {
    apiFetchFn.mockClear();
    dispatchFn.mockClear();
  });

  it('Fetches keywords on FETCH_KEYWORDS action', async () => {
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
        select: () => ({
          getEditedPostAttribute: jest.fn()
            .mockReturnValueOnce(1)
            .mockReturnValueOnce('title')
            .mockReturnValueOnce('content'),
        }),
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
