import getState from './getState';

describe('getState', () => {
  it('Maps embed data next to state keys', async () => {
    const data = {
      embeds: {
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
      },
      state: { key: true },
      success: true,
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    const result = await getState();
    expect(result).toEqual({
      data: {
        ...data.state,
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
      embeds: {},
      state: { key: true },
      success: true,
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    const result = await getState();
    expect(result).toEqual({
      data: {
        ...data.state,
        embeds: {
          hero: null,
          positionTwo: null,
        },
      },
      hasError: false,
    });
  });
});
