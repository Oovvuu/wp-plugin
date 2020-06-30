import initialState from 'components/app/context/initialState';
import saveState from './saveState';

describe('saveState', () => {
  it('Recommended videos', async () => {
    const id = 1312;
    const data = {
      ...initialState,
      recommendedVideos: {
        hero: [{ id: '1234' }],
        positionTwo: [{ id: '1234' }],
      },
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    await saveState(data, id);

    // ApiFetch should not have been called for an empty state.
    expect(wp.apiFetch).toHaveBeenCalled();
  });

  it('Sidebar hero video', async () => {
    const id = 1312;
    const data = {
      ...initialState,
      sidebarSelectedHeroVideo: { id: '1234' },
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    await saveState(data, id);

    // ApiFetch should not have been called for an empty state.
    expect(wp.apiFetch).toHaveBeenCalled();
  });

  it('Already loaded from meta', async () => {
    const id = 1312;
    const data = {
      ...initialState,
      isLoadedFromMeta: true,
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    await saveState(data, id);

    // ApiFetch should not have been called for an empty state.
    expect(wp.apiFetch).toHaveBeenCalled();
  });

  it('Does not change saved state if no videos are embedded', async () => {
    const id = 1312;
    const data = {
      ...initialState,
    };
    global.wp = {
      apiFetch: jest.fn(() => Promise.resolve(data)),
      i18n: { __: jest.fn() },
    };

    await saveState(data, id);

    // ApiFetch should not have been called for an empty state.
    expect(wp.apiFetch).not.toHaveBeenCalled();
  });
});
