import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerLoader from '@brightcove/react-player-loader';

/**
 * Renders a Brightcove player.
 */
const BrightcovePlayer = (props) => {
  const { videoId, playerId, accountId } = props;

  return (
    <ReactPlayerLoader
      accountId={accountId}
      playerId={playerId}
      videoId={videoId}
      embedOptions={{ responsive: true }}
    />
  );
};

BrightcovePlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
};

export default BrightcovePlayer;
