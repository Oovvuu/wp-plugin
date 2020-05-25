import React from 'react';
import PropTypes from 'prop-types';
import Player from './player';

/**
 * Displays a specific Brightcove player for a given video.
 */
const PlayerWrapper = (props) => {
  const { videos } = props;
  const [previewVideos, setPreviewVideos] = React.useState(videos);

  /**
   * Swap video that is assigned to the player when clicking in one of the images.
   * @param int position of the video in the array.
   */
  const updatePlayer = (position) => {
    [previewVideos[0], previewVideos[position]] = [previewVideos[position], previewVideos[0]];
    setPreviewVideos([...previewVideos]);
  };

  /**
   * At the moment, the player API is in flux, so this is just a stub to identify
   *   whether we have videos and, if so, to extract the first of the list to show a player.
   * @returns {null|*}
   */
  const getPlayer = () => {
    if (!previewVideos.length) {
      return null;
    }

    return previewVideos.map((video, position) => (
      <Player
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
      brightcoveAccountId: PropTypes.string.isRequired,
    }).isRequired,
    thumbnail: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default PlayerWrapper;
