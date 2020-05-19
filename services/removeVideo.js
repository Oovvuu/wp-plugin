/**
 * Removes a video from a position and backfills the opening with a secondary
 * video if one exists.
 *
 * @param  {object} state    The current state array.
 * @param  {[type]} position The position to remove a video from.
 * @param  {[type]} videoId  The video ID to remove.
 * @return {object} state    The new state.
 */
const removeVideo = (state, position, videoId) => {
  const newState = state;
  const startLength = newState.selectedVideos[position].length;

  // Clear out the existing video.
  newState.selectedVideos[position] = newState.selectedVideos[position]
    .filter((video) => video.id !== videoId);

  // No videos to remove so bail.
  if (startLength === newState.selectedVideos[position].length) {
    return newState;
  }

  // Get the first video in the secondary videos to be the replacement.
  let newVideo = null;

  if (newState.selectedVideos[`${position}Secondary`]?.length) {
    newVideo = newState.selectedVideos[`${position}Secondary`].shift();
  }

  // Set the video to the first video from the secondary videos.
  if (newVideo) {
    newState.selectedVideos[position] = [...newState.selectedVideos[position], newVideo];
  }

  return newState;
};

export default removeVideo;
