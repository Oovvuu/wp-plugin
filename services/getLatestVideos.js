/**
 * Performs an API request to obtain the latest videos.
 *
 * @param  {string}  id Post ID.
 * @returns {Promise} Future object for API response data.
 */

const getLatestVideos = (id) => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/latestVideos/',
    method: 'POST',
    data: { id },
  })
    .then((value) => {
      if (value.data === null) {
        return {
          hasError: true,
          message: __('Unable to perform request.', 'oovvuu'),
        };
      }

      const videoSet = value?.data?.videoSet || null;

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
