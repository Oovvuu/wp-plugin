import React from 'react';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import Player from './player';

/**
 * Container component for video positions, includes player and thumbnails.
 */
const PlayerWrapper = (props) => {
  const { videos } = props;

  const {
    state: {
      lastActionType = '',
    } = {},
  } = React.useContext(OovvuuDataContext);

  const [previewVideos, setPreviewVideos] = React.useState([...videos]);

  /**
   * Determines if the video arrays are equal.
   *
   * @param  {array} videosA Videos array.
   * @param  {array} videosB Videos array.
   * @return {bool} True if the videos are equal, otherwise false;
   */
  const videosEqual = (videosA, videosB) => {
    // Map both video arrays to just include ids.
    const videoAIds = videosA.map((video) => (video.id));
    const videoBIds = videosB.map((video) => (video.id));

    // Length is not equal.
    if (videoAIds.length !== videoBIds.length) {
      return false;
    }

    // Remove all videos in videoA that are in videoB.
    const filteredVideoAIds = videoAIds.filter((videoId, index) => videoBIds[index] !== videoId);

    // The arrays are equal if videoAIds is empty.
    return filteredVideoAIds.length === 0;
  };

  /**
   * Swap video that is assigned to the player when clicking in one of the images.
   *
   * @param {int} position of the video in the array.
   */
  const updatePlayer = (position) => {
    [previewVideos[0], previewVideos[position]] = [previewVideos[position], previewVideos[0]];
    setPreviewVideos([...previewVideos]);
  };

  /**
   * Update the video previews if the videos have been updated.
   */
  React.useEffect(() => {
    if (!videosEqual([...videos], [...previewVideos])) {
      setPreviewVideos([...videos]);
    }
  }, [videos]);

  /**
    * Update the preview videos when videos are swapped.
    */
  React.useEffect(() => {
    if (
      lastActionType === 'SWAP_VIDEOS'
       || lastActionType === 'CLEAR_LOADING_STATE'
    ) {
      setPreviewVideos([...videos]);
    }
  }, [lastActionType]);

  /**
   * At the moment, the player API is in flux, so this is just a stub to identify
   * whether we have videos and, if so, to extract the first of the list to show a player.
   *
   * @returns {null|*}
   */
  const getPlayer = () => {
    if (!previewVideos.length) {
      return null;
    }

    return previewVideos.map((video, position) => (
      <Player
        key={video.id}
        video={video}
        position={position}
        updatePlayer={() => { updatePlayer(position); }}
      />
    ));
  };

  return getPlayer();
};

PlayerWrapper.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    preview: PropTypes.shape({
      brightcoveVideoId: PropTypes.string,
      brightcovePlayerId: PropTypes.string,
      brightcoveAccountId: PropTypes.string,
    }),
  })).isRequired,
};

export default PlayerWrapper;
