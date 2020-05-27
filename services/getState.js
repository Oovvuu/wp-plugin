/**
 * Performs an API request to get the current state.
 *
 * @param   {int}    id    The post ID.
 * @returns {Promise}      Future object for API response data.
 */
const getState = (id) => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/getState/',
    method: 'POST',
    data: { id },
  })
    .then((value) => (value.success
      ? {
        hasError: false,
        data: value.state,
      } : {
        hasError: true,
        message: __('Malformed response data.', 'oovvuu'),
      }))
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

export default getState;
