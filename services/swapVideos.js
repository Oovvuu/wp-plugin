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

  // Check if the swap is happening within the same position.
  if (payload.videoA.positionKey === payload.videoB.positionKey) {
    const { videoA: { positionKey } } = payload;

    // Get the video indexes based on their IDs.
    let videoAIndex = null;
    let videoBIndex = null;

    console.log(newState.selectedVideos[positionKey]);

    newState.selectedVideos[positionKey].filter((value, index) => {
      if (value.id === payload.videoA.videoId.toString()) {
        videoAIndex = index;
      }

      if (value.id === payload.videoB.videoId.toString()) {
        videoBIndex = index;
      }

      return value;
    });

    // Swap the videos.
    if (videoAIndex !== null && videoBIndex !== null) {
      console.log('Swap');
      console.log(videoAIndex);
      console.log(videoBIndex);
      [
        newState.selectedVideos[positionKey][videoAIndex],
        newState.selectedVideos[positionKey][videoBIndex],
      ] = [
        newState.selectedVideos[positionKey][videoBIndex],
        newState.selectedVideos[positionKey][videoAIndex],
      ];
    }

    console.log(newState.selectedVideos[positionKey]);
  }

  return newState;
};

export default swapVideos;
