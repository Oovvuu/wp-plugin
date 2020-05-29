import initialState from 'components/app/context/initialState';
import getState from './getState';

describe('getState', () => {
  it('Maps embed data next to state keys', async () => {
    const embedsData = {
      hero: {
        data: {
          createEmbed: {
            id: 'hero-id',
            snippet: 'hero-snippet',
          },
        },
      },
      positionTwo: {
        data: {
          createEmbed: {
            id: 'positionTwo-id',
            snippet: 'positionTwo-snippet',
          },
        },
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
          hero: data.embeds.hero.data.createEmbed,
          positionTwo: data.embeds.positionTwo.data.createEmbed,
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
