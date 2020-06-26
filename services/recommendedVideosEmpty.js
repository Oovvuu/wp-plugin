/**
 * Determines if the recommended videos is empty.
 *
 * @param  {object} recommendedVideos The recommended videos object.
 * @return {bool} True if recommended videos are empty, otherwise false.
 */
function recommendedVideosEmpty(recommendedVideos) {
  return (
    recommendedVideos?.hero.length > 0
    && recommendedVideos?.positionTwo.length > 0
  );
}

export default recommendedVideosEmpty;
