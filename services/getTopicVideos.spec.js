import * as getVideos from './getVideos';
import getTopicVideos from './getTopicVideos';

describe('getTopicVideos service', () => {
  beforeEach(() => {
    global.wp = { i18n: { __: jest.fn() } };
  });

  it(
    'Resolves with error object if more than one topic keyword passed as param',
    () => getTopicVideos(['one', 'two'], '1').then((data) => {
      expect(data.hasError).toBeTruthy();
    }),
  );

  it('Proxies the API call to getVideos()', () => {
    const getVideosSpy = jest.spyOn(getVideos, 'default')
      .mockImplementationOnce(() => Promise.resolve({}));

    getTopicVideos(['one'], '1');

    expect(getVideosSpy).toHaveBeenCalledWith(['one'], '1');
  });
});
