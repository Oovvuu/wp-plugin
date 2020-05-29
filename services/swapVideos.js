/**
 * Removes a video from a position and backfills the opening with a secondary
 * video if one exists.
 *
 * @param  {object} state   The current state array.
 * @param  {object} payload The videos to swap.
 * @return {object} state   The new state.
 */
const swapVideos = (state, payload) => {
  const newState = state;

  // Bail if the videos are already swapped.
  if (
    (
      newState.selectedVideos[payload.videoA.positionKey][payload.videoA.index].id
      === payload.videoB.videoId
    )
    && (
      newState.selectedVideos[payload.videoB.positionKey][payload.videoB.index].id
      === payload.videoA.videoId
    )
  ) {
    return newState;
  }

  // Swap the videos.
  [
    newState.selectedVideos[payload.videoA.positionKey][payload.videoA.index],
    newState.selectedVideos[payload.videoB.positionKey][payload.videoB.index],
  ] = [
    newState.selectedVideos[payload.videoB.positionKey][payload.videoB.index],
    newState.selectedVideos[payload.videoA.positionKey][payload.videoA.index],
  ];

  return { ...newState };
};

export default swapVideos;
