/**
 * Performs an API request to get organiation metrics.
 *
 * @returns {Promise}      Future object for API response data.
 */
const getOrganizationMetrics = () => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/getOrganizationMetrics/',
    method: 'POST',
  })
    .then((value) => {
      if (value.data === null) {
        return {
          hasError: true,
          message: __('Unable to perform request.', 'oovvuu'),
        };
      }

      const metrics = value?.data?.organisation?.metrics;

      return metrics
        ? {
          hasError: false,
          data: { ...metrics },
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

export default getOrganizationMetrics;
