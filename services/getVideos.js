/**
 * Performs an API request to obtain videos given keywords.
 *
 * @param  {[array]}  keywords The keywords.
 * @returns {Promise} Future object for API response data.
 */
import transformAlternateSearch from 'transforms/alternateSearches';

const getVideos = (keywords, id) => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/videos/',
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

      const videosForArticle = value?.data?.videosForArticle || null;

      return videosForArticle
        ? {
          hasError: false,
          data: {
            videos: {
              ...videosForArticle,
              alternateSearches: videosForArticle.alternateSearches.map(transformAlternateSearch),
            },
          },
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
