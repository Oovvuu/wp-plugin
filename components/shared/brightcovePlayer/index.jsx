import React from 'react';
import PropTypes from 'prop-types';
import eventBus from 'services/eventBus';
import ReactPlayerLoader from '@brightcove/react-player-loader';

/**
 * Renders a Brightcove player.
 */
const BrightcovePlayer = (props) => {
  const { videoId, playerId, accountId } = props;
  let player = React.useRef(null);

  /**
   * Handler for succes method of loader. Stores ref to player instance and sets listener.
   * @param loaded
   */
  const handleSuccess = (loaded) => {
    player = loaded.ref;

    // eslint-disable-next-line no-underscore-dangle
    player.on('play', () => { eventBus.dispatch('oovvuuPlayVideo', { videoId: player.id_ }); });
  };

  /**
   * Sets event bus listener for sync'ing playing state of instance.
   */
  React.useEffect(() => {
    const callback = (details) => {
      // eslint-disable-next-line no-underscore-dangle
      if (player.id_ !== details.videoId) {
        player.pause();
      }
    };

    eventBus.on('oovvuuPlayVideo', callback);

    return () => { eventBus.remove('oovvuuPlayVideo', callback); };
  }, []);

  return (
    <ReactPlayerLoader
      accountId={accountId}
      playerId={playerId}
      videoId={videoId}
      embedOptions={{ responsive: true }}
      onSuccess={handleSuccess}
    />
  );
};

BrightcovePlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
};

export default BrightcovePlayer;
