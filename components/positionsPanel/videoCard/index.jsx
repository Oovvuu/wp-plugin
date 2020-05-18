import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays an individual video with an position.
 */
const VideoCardWrapper = (props) => {
  const { video: { title } } = props;

  return (
    <div>
      <p>{title}</p>
    </div>
  );
};

VideoCardWrapper.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
