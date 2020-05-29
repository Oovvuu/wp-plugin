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

  // Get the video indexes based on their IDs.
  let videoAIndex = null;
  let videoBIndex = null;

  newState.selectedVideos[payload.videoA.positionKey].filter((value, index) => {
    if (value.id === payload.videoA.videoId.toString()) {
      videoAIndex = index;
    }

    return value;
  });

  newState.selectedVideos[payload.videoB.positionKey].filter((value, index) => {
    if (value.id === payload.videoB.videoId.toString()) {
      videoBIndex = index;
    }

    return value;
  });

  // Swap the videos.
  if (videoAIndex !== null && videoBIndex !== null) {
    [
      newState.selectedVideos[payload.videoA.positionKey][videoAIndex],
      newState.selectedVideos[payload.videoB.positionKey][videoBIndex],
    ] = [
      newState.selectedVideos[payload.videoB.positionKey][videoBIndex],
      newState.selectedVideos[payload.videoA.positionKey][videoAIndex],
    ];
  }

  return newState;
};

export default swapVideos;
