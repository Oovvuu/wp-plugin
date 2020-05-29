import initialState from 'components/app/context/initialState';

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
    .then((value) => {
      const { embeds: { hero, positionTwo }, state, success } = value;
      // Unwraps buried data in embed for convenience in this app.
      const exractEmbedDataFor = (embed) => {
        const { id: embedId, snippet } = embed?.data?.createEmbed ?? {};

        return embedId && snippet ? { id: embedId, snippet } : null;
      };
      const heroData = exractEmbedDataFor(hero);
      const positionTwoData = exractEmbedDataFor(positionTwo);
      const embedsData = heroData && positionTwoData
        ? { hero: heroData, positionTwo: positionTwoData }
        : null;

      return success
        ? {
          hasError: false,
          data: {
            ...initialState,
            ...state,
            embeds: embedsData ? { ...embedsData } : { ...initialState.embeds },
          },
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

export default getState;
