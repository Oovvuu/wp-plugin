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
        key={video.id}
        video={video}
        position={position}
        updatePlayer={() => { updatePlayer(position); }}
      />
    ));
  };

  /**
   * Update the preview videos when videos are swapped.
   */
  React.useEffect(() => {
    if (lastActionType === 'SWAP_VIDEOS') {
      setPreviewVideos([...videos]);
    }
  }, [lastActionType]);

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
