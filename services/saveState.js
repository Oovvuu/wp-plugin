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

  /**
   * Returns a clean state that removed values that should not be persistent.
   *
   * @param  {object} dirtyState The dirty state.
   * @return {object}            The clean state.
   */
  const getCleanState = (dirtyState) => Object.keys(dirtyState).reduce((carry, key) => {
    // Excluded from post meta.
    const filter = [
      'embeds',
      'isLoading',
      'isUserAuthenticated',
      'lastActionType',
      'loadingAttributes',
    ];

    return !filter.includes(key) ? { ...carry, ...{ [key]: dirtyState[key] } } : carry;
  }, {});

  return apiFetch({
    path: '/oovvuu/v1/saveState/',
    method: 'POST',
    data: {
      id,
      state: getCleanState(state),
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
