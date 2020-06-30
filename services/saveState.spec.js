import initialState from 'components/app/context/initialState';
import saveState from './saveState';
import cleanDirtyState from './cleanDirtyState';

describe('saveState', () => {
  // @TODO Add test case for sidebar embeds

  it('Does not change saved state if no videos are embedded', async () => {
    const id = 1312;
    const data = {
      ...initialState,
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    const cleanState = cleanDirtyState(initialState);
    const result = await saveState(data, id);
    expect(result).toEqual({
      hasError: false,
      data: { ...cleanState },
    });
  });
});
