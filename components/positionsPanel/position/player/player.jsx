import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerLoader from '@brightcove/react-player-loader';
import styles from 'components/positionsPanel/position/position.scss';

/**
 * Displays a specific Brightcove player for a given video.
 */
const Player = (props) => {
  const { video, position, updatePlayer } = props;

  const onSuccess = function (success) {
    console.log(success);
  };

  const onFailure = function (failure) {
    console.log(failure);
  };

  /**
   * Return brightcove player component or thumbnail for a given video.
   * @returns {null|*}
   */
  const getPlayer = () => {
    if (!video.id) {
      return null;
    }

    const { id, preview, thumbnail: { url } } = video;
    const isPreviewConfigured = preview?.brightcoveAccountId
        && preview?.brightcovePlayerId
        && preview?.brightcoveVideoId
        && position === 0;

    return isPreviewConfigured ? (
      <ReactPlayerLoader
        key={id}
        accountId={preview.brightcoveAccountId}
        playerId={preview.brightcovePlayerId}
        videoId={preview.brightcoveVideoId}
        embedOptions={{ responsive: true }}
        onSuccess={(success) => { onSuccess(success); }}
        onFailure={(failure) => { onFailure(failure); }}
      />
    ) : (
      <button
        key={id}
        type="button"
        className={styles.brightcoveThumbnail}
        onClick={updatePlayer}
      >
        <img src={url} alt="" />
      </button>
    );
  };

  return getPlayer();
};

Player.propTypes = {
  video: PropTypes.shape({
    preview: PropTypes.shape({
      brightcoveVideoId: PropTypes.string,
      brightcovePlayerId: PropTypes.string,
      brightcoveAccountId: PropTypes.string.isRequired,
    }).isRequired,
    thumbnail: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  position: PropTypes.number.isRequired,
  updatePlayer: PropTypes.func.isRequired,
};

export default Player;
