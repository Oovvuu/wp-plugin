import React from 'react';
import PropTypes from 'prop-types';
import LatestVideoItemWrapper from './latestVideoItem';

/**
 * The latest video list container.
 */
const LatestVideoListWrapper = ({ videos }) => (
  <ul className={styles.list}>
    {videos.map((video) => (
      <LatestVideoItemWrapper
        key={video.id}
        video={video}
      />
    ))}
  </ul>
);

LatestVideoListWrapper.propTypes = {
  videos: PropTypes.arrayOf({
    collection: PropTypes.shape({
      provider: PropTypes.shape({
        logo: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
        legalName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    summary: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    modified: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestVideoListWrapper;
