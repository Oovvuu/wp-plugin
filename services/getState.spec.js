import getState from './getState';

describe('getState', () => {
  it('Maps embed data next to state keys', async () => {
    const data = {
      embeds: {},
      state: { key: true },
      success: true,
    };
    const apiFetchFn = jest.fn(() => Promise.resolve(data));
    global.wp = {
      apiFetch: apiFetchFn,
      i18n: { __: jest.fn() },
    };

    const result = await getState();
    const { embeds, state } = data;
    expect(result).toEqual({ data: { ...state, embeds }, hasError: false });
  });
});
