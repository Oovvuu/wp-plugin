/**
 * Performs an API request to save the current state.
 *
 * @param   {object} state The current state.
 * @param   {int}    id    The post ID.
 * @returns {Promise}      Future object for API response data.
 */
const saveState = (state, id) => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/save/',
    method: 'POST',
    data: { state, id },
  })
    .then((value) => (value.success
      ? {
        hasError: false,
        data: value,
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

export default saveState;
