import React from 'react';
import PropTypes from 'prop-types';
import VideoCardWrapper from '../videoCard';
import PositionToggleWrapper from '../positionToggle';

/**
 * Handles logic for displaying a specific position.
 */
const PositionWrapper = (props) => {
  const { positionTitle, videos } = props;

  return (
    <>
      <h3>{positionTitle}</h3>
      <PositionToggleWrapper />
      <div>
        {videos && videos.map(({
          id, thumbnail, title, preview,
        }) => (
          <VideoCardWrapper
            key={id}
            id={id}
            thumbnail={thumbnail}
            title={title}
            preview={preview}
          />
        ))}
      </div>
    </>
  );
};

PositionWrapper.propTypes = {
  positionTitle: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
    preview: PropTypes.shape({
      brightcoveVideoId: PropTypes.string,
      brightcovePlayerId: PropTypes.string,
      brightcoveAccountId: PropTypes.string.isRequired,
    }),
  })).isRequired,
};

export default PositionWrapper;
