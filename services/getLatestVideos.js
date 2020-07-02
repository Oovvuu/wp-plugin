/**
 * Performs an API request to obtain the latest videos.
 *
 * @param {array} keywords The array of keywords.
 * @param  {string}  id Post ID.
 * @returns {Promise} Future object for API response data.
 */

const getLatestVideos = (keywords, id) => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/latestVideos/',
    method: 'POST',
    data: { keywords, id },
  })
    .then((value) => {
      if (value.data === null) {
        return {
          hasError: true,
          message: __('Unable to perform request.', 'oovvuu'),
        };
      }

      const videoSet = value?.data?.videoSet;

      return videoSet
        ? {
          hasError: false,
          data: {
            videos: [...videoSet.pageResults],
            totalCount: videoSet.totalCount,
          },
        } : {
          hasError: true,
          message: __('Malformed response data.', 'oovvuu'),
        };
    })
    .catch((error) => {
      const { message } = error;

      return {
        hasError: true,
        error: { message },
      };
    });
};

export default getLatestVideos;
