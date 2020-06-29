import cleanDirtyState from './cleanDirtyState';
import recommendedVideosEmpty from './recommendedVideosEmpty';

/**
 * Performs an API request to save the current state.
 *
 * @param   {object} state The current state.
 * @param   {int}    id    The post ID.
 * @returns {Promise}      Future object for API response data.
 */
const saveState = (state, id) => {
  const { apiFetch, i18n: { __ } } = wp;
  const cleanState = cleanDirtyState(state);

  /**
   * Check to determine if the saveState request contains
   * videos. The state shouldn't update if there are no videos to save.
   *
   * @returns {bool}
   */
  const hasVideoEmbedsToSave = () => recommendedVideosEmpty(cleanState.recommendedVideos);

  // Return promise early if no videos are present.
  if (!hasVideoEmbedsToSave()) {
    return Promise.resolve({
      hasError: false,
      data: {
        state: cleanState,
      },
    });
  }

  return apiFetch({
    path: '/oovvuu/v1/saveState/',
    method: 'POST',
    data: {
      id,
      state: cleanState,
    },
  }).then((value) => {
    const { embeds, state: updatedState, success } = value;

    return success
      ? {
        hasError: false,
        data: { ...updatedState, embeds },
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

export default saveState;
