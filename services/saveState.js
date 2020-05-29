/**
 * Performs an API request to save the current state.
 *
 * @param   {object} state The current state.
 * @param   {int}    id    The post ID.
 * @returns {Promise}      Future object for API response data.
 */
const saveState = (state, id) => {
  const { apiFetch, i18n: { __ } } = wp;

  // Override state properties we don't want to save to post meta.
  const localState = {
    ...state,
    isLoading: false,
    loadingAttributes: {
      message: '',
    },
  };

  console.log(localState);

  return apiFetch({
    path: '/oovvuu/v1/saveState/',
    method: 'POST',
    data: { localState, id },
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
