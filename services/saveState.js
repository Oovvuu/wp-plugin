/**
 * Performs an API request to save the current state.
 *
 * @param   {object} state The current state.
 * @param   {int}    id    The post ID.
 * @returns {Promise}      Future object for API response data.
 */
import transform from 'transforms/embeds';

const saveState = (state, id) => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/saveState/',
    method: 'POST',
    data: {
      id,
      // Filter out properties we don't want in post meta.
      state: Object.keys(state).reduce((carry, key) => {
        // Excluded from post meta.
        const filter = [
          'embeds',
          'isLoading',
          'isUserAuthenticated',
          'lastActionType',
          'loadingAttributes',
        ];

        return !filter.includes(key) ? { ...carry, ...{ [key]: state[key] } } : carry;
      }, {}),
    },
  }).then((value) => {
    const { embeds, state: updatedState, success } = value;

    return success
      ? {
        hasError: false,
        data: { ...updatedState, embeds: transform(embeds) },
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

export default saveState;
