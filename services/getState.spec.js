import initialState from 'components/app/context/initialState';
import getState from './getState';

describe('getState', () => {
  it('Maps embed data next to state keys', async () => {
    const embedsData = {
      hero: {
        id: 'hero-id',
      },
      positionTwo: {
        id: 'positionTwo-id',
      },
    };
    const data = {
      ...initialState,
      embeds: { ...embedsData },
      success: true,
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    const result = await getState();
    expect(result).toEqual({
      data: {
        ...initialState,
        embeds: {
          hero: data.embeds.hero,
          positionTwo: data.embeds.positionTwo,
        },
      },
      hasError: false,
    });
  });

  it('Maps embed keys to null when no embed data exists', async () => {
    const data = {
      ...initialState,
      embeds: {},
      success: true,
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    const result = await getState();
    expect(result).toEqual({
      data: {
        ...initialState,
        embeds: {
          hero: null,
          positionTwo: null,
        },
      },
      hasError: false,
    });
  });
});
