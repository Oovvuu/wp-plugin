import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerLoader from '@brightcove/react-player-loader';

/**
 * Displays a specific Brightcove player for a given video.
 */
const PlayerWrapper = (props) => {
  const { videos } = props;
  const { preview, thumbnail: { url } } = videos[0];

  const onSuccess = function (success) {
    console.log(success);
  };

  const onFailure = function (failure) {
    console.log(failure);
  };

  return (
    preview
    && preview.brightcoveAccountId
    && preview.brightcovePlayerId
    && preview.brightcoveVideoId
      ? (
        <ReactPlayerLoader
          accountId={preview.brightcoveAccountId}
          playerId={preview.brightcovePlayerId}
          videoId={preview.brightcoveVideoId}
          onSuccess={(success) => { onSuccess(success); }}
          onFailure={(failure) => { onFailure(failure); }}
        />
      )
      : (<img src={url} alt="" />)
  );
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
