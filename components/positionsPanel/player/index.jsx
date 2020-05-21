import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerLoader from '@brightcove/react-player-loader';

/**
 * Displays a specific Brightcove player for a given video.
 */
const PlayerWrapper = (props) => {
  const { videos } = props;

  const onSuccess = function (success) {
    console.log(success);
  };

  const onFailure = function (failure) {
    console.log(failure);
  };

  /**
   * At the moment, the player API is in flux, so this is just a stub to identify
   *   whether we have videos and, if so, to extract the first of the list to show a player.
   * @returns {null|*}
   */
  const getPlayer = () => {
    if (!videos.length) {
      return null;
    }

    return videos.map((video) => {
      const { id, preview, thumbnail: { url } } = video;
      const isPreviewConfigured = preview?.brightcoveAccountId
        && preview?.brightcovePlayerId
        && preview?.brightcoveVideoId;

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
      ) : <img src={url} alt="" />;
    });
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
