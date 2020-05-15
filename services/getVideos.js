/**
 * Performs an API request to obtain videos given keywords.
 *
 * @param  {[array]}  keywords The keywords.
 * @returns {Promise} Future object for API response data.
 */
const getVideos = (keywords, id) => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/videos/',
    method: 'POST',
    data: { keywords, id },
  })
    .then((value) => {
      const { videosForArticle } = value?.data || null;
      return videosForArticle
        ? {
          hasError: false,
          data: { videos: videosForArticle },
        } : {
          hasError: true,
          message: __('Malformed response data.', 'oovvuu'),
        };
    })
    .catch((error) => {
      const { message } = error;
      // TODO: Perform error handling.
      console.error(error);

      return {
        hasError: true,
        error: { message },
      };
    });
};

export default getVideos;
