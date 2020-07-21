/**
 * Performs an API request to get the number of videos added over the last 24 hours.
 *
 * @returns {Promise} Future object for API response data.
 */
const getVideosAdded = () => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/getVideosAdded/',
    method: 'POST',
  })
    .then((value) => {
      if (value.data === null) {
        return {
          hasError: true,
          message: __('Unable to perform request.', 'oovvuu'),
        };
      }

      const totalCount = value?.data?.videoSet?.totalCount || 0;

      return typeof totalCount !== 'undefined'
        ? {
          hasError: false,
          data: { totalCount },
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

export default getVideosAdded;
