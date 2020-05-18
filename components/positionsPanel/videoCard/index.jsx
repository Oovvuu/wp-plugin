import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays an individual video with an position.
 */
const VideoCardWrapper = (props) => {
  const { positionKey, video: { title } } = props;

  // TODO: Remove when positionKey is used.
  console.log(positionKey);

  return (
    <div>
      <p>{title}</p>
    </div>
  );
};

VideoCardWrapper.propTypes = {
  positionKey: PropTypes.string.isRequired,
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
