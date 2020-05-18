import React from 'react';
import PropTypes from 'prop-types';
import PlayerWrapper from 'components/player';

/**
 * Stub component for the video card wrapper.
 */
const VideoCardWrapper = (props) => {
  const {
    id, title, thumbnail: { url }, preview,
  } = props;

  return (
    <div
      key={id}
    >
      <p>{title}</p>
      <PlayerWrapper
        thumbnailUrl={url}
        preview={preview}
      />
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
