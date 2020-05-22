import React from 'react';
import PropTypes from 'prop-types';
import Player from './player';

/**
 * Displays a specific Brightcove player for a given video.
 */
const PlayerWrapper = (props) => {
  const { videos } = props;
  // , setPreviewVideos
  const [previewVideos, setPreviewVideos] = React.useState(videos);

  const updatePlayer = (position) => {
    const newPreviewVideos = [];
    newPreviewVideos.push(previewVideos[position]);
    for (let i = 1; i < previewVideos.length; i += 1) {
      if (i === position) {
        newPreviewVideos.push(previewVideos[0]);
      } else {
        newPreviewVideos.push(previewVideos[i]);
      }
    }

    setPreviewVideos(newPreviewVideos);
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

    console.log(previewVideos);

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
