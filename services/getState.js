import initialState from 'components/app/context/initialState';
import Cache from 'utils/cache';

/**
 * Performs an API request to get the current state.
 *
 * @param   {int}    id    The post ID.
 * @returns {Promise}      Future object for API response data.
 */
const getState = (id) => {
  const { apiFetch, i18n: { __ } } = wp;

  // Attempt to get the state from the cache.
  const cachedState = Cache.get('oovvuu-state');

  // Return the state if it is cached.
  if (cachedState !== null) {
    return Promise.resolve(cachedState);
  }

  return apiFetch({
    path: '/oovvuu/v1/getState/',
    method: 'POST',
    data: { id },
  })
    .then((value) => {
      const { embeds, state, success } = value;

      const response = success
        ? {
          hasError: false,
          data: {
            ...initialState,
            ...state,
            embeds: {
              ...initialState.embeds,
              ...embeds,
            },
          },
        } : {
          hasError: true,
          message: __('Malformed response data.', 'oovvuu'),
        };

      // Cache the data.
      Cache.set('oovvuu-state', response);

      // Return the response.
      return response;
    })
    .catch((error) => {
      const { message } = error;

      const response = {
        hasError: true,
        error: { message },
      };

      // Cache the data.
      Cache.set('oovvuu-state', response);

      // Return the response.
      return response;
    });
};

export default getState;
