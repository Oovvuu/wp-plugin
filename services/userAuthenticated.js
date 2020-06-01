/**
 * Performs an API request to get the current state of user authentication.
 *
 * @returns {Promise}      Future object for API response data.
 */
const userAuthenticated = () => {
  const { apiFetch, i18n: { __ } } = wp;

  return apiFetch({
    path: '/oovvuu/v1/userAuthenticated/',
    method: 'GET',
  })
    .then((value) => (value
      ? {
        hasError: false,
        data: value,
      } : {
        hasError: true,
        message: __('Authentication failed.', 'oovvuu'),
      }))
    .catch((error) => {
      const { message } = error;
      // TODO: Perform error handling - user is not auth'd.
      console.error(error);
      return {
        hasError: true,
        error: { message },
      };
    });
};

export default userAuthenticated;
