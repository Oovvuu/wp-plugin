import Cache from 'utils/cache';

/**
 * Performs an API request to get the current state of user authentication.
 *
 * @returns {Promise}      Future object for API response data.
 */
const userAuthenticated = () => {
  const { apiFetch, i18n: { __ } } = wp;

  // Attempt to get auth from the cache.
  const cachedAuth = Cache.get('oovvuu-user-authenticated');

  // Return the auth if it is cached.
  if (cachedAuth !== null) {
    return Promise.resolve(cachedAuth);
  }

  return apiFetch({
    path: '/oovvuu/v1/userAuthenticated/',
    method: 'GET',
  })
    .then((value) => {
      const response = value
        ? {
          hasError: false,
          data: value,
        } : {
          hasError: true,
          message: __('Authentication failed.', 'oovvuu'),
        };

      // Cache the data.
      Cache.set('oovvuu-user-authenticated', response);

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
      Cache.set('oovvuu-user-authenticated', response);

      // Return the response.
      return response;
    });
};

export default userAuthenticated;
