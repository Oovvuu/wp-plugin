import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stub component for the video card wrapper.
 */
const VideoCardWrapper = (props) => {
  const { id, title, thumbnail: { url } } = props;

  return (
    <div
      key={id}
    >
      <p>{title}</p>
      <img src={url} alt="" />
    </div>
  );
};

VideoCardWrapper.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
};

export default VideoCardWrapper;
