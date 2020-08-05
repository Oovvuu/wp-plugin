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
   * Handler for success method of loader. Stores ref to player instance and sets listener.
   * @param loaded
   */
  const handleSuccess = (loaded) => {
    player = loaded.ref;

    // eslint-disable-next-line no-underscore-dangle
    player.on('play', () => { eventBus.dispatch('oovvuuPlayVideo', { videoId: player.id_ }); });
  };

  /**
   * Sets event bus listeners for sync'ing playing state of instance.
   */
  React.useEffect(() => {
    /**
     * Safely exit picture-in-picture mode on a video.
     *
     * @param {object} pipPlayer The picture-in-picture player.
     */
    const exitPictureInPicture = (pipPlayer) => {
      if (
        typeof pipPlayer.isInPictureInPicture === 'function'
        && typeof pipPlayer.exitPictureInPicture === 'function'
        && pipPlayer.isInPictureInPicture()
      ) {
        pipPlayer.exitPictureInPicture();
      }
    };

    /**
     * Handles pausing all videos.
     */
    const handlePauseVideo = () => {
      player.pause();
      exitPictureInPicture(player);
    };

    /**
     * Handles pausing all videos expect for the current video being played.
     *
     * @param {Event} event The event object.
     */
    const handlePlayVideo = ({ detail }) => {
      // eslint-disable-next-line no-underscore-dangle
      if (!!player && player.id_ !== detail.videoId) {
        player.pause();
        exitPictureInPicture(player);
      }
    };

    eventBus.on('oovvuuPlayVideo', handlePlayVideo);
    eventBus.on('oovvuuPauseVideo', handlePauseVideo);

    return () => {
      eventBus.remove('oovvuuPauseVideo', handlePauseVideo);
      eventBus.remove('oovvuuPlayVideo', handlePlayVideo);
    };
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
