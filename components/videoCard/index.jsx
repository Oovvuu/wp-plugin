import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerLoader from '@brightcove/react-player-loader';

/**
 * Stub component for the video card wrapper.
 */
const VideoCardWrapper = (props) => {
  const {
    id, title, thumbnail: { url }, preview,
  } = props;

  const onSuccess = function (success) {
    console.log(success);
  };

  const onFailure = function (failure) {
    console.log(failure);
  };

  return (
    <div
      key={id}
    >
      <p>{title}</p>
      {
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
      }
    </div>
  );
};

VideoCardWrapper.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  preview: PropTypes.shape({
    brightcoveVideoId: PropTypes.string,
    brightcovePlayerId: PropTypes.string,
    brightcoveAccountId: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
