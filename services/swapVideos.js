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
  const getVideoIndex = (videos, videoId) => {
    let videoIndex = null;

    videos.filter((value, index) => {
      if (value.id === videoId.toString()) {
        videoIndex = index;
      }

      return value;
    });

    return videoIndex;
  };

  const videoAIndex = getVideoIndex(
    newState.selectedVideos[payload.videoA.positionKey],
    payload.videoA.videoId,
  );
  const videoBIndex = getVideoIndex(
    newState.selectedVideos[payload.videoB.positionKey],
    payload.videoB.videoId,
  );

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

  return { ...newState };
};

export default swapVideos;
