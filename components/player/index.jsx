import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerLoader from '@brightcove/react-player-loader';

/**
 * Stub component for the video player wrapper.
 */
const PlayerWrapper = (props) => {
  const { thumbnailUrl, preview } = props;

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
      : (<img src={thumbnailUrl} alt="" />)
  );
};

PlayerWrapper.propTypes = {
  thumbnailUrl: PropTypes.string.isRequired,
  preview: PropTypes.shape({
    brightcoveVideoId: PropTypes.string,
    brightcovePlayerId: PropTypes.string,
    brightcoveAccountId: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlayerWrapper;
