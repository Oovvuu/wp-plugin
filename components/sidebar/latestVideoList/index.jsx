import React from 'react';
import PropTypes from 'prop-types';
import LatestVideoItemWrapper from './latestVideoItem';
import styles from './latestVideoList.scss';

/**
 * The latest video list container.
 */
const LatestVideoListWrapper = (props) => {
  const {
    videos,
    isRemovingVideo,
    isAddingVideo,
    updateIsAddingVideo,
  } = props;

  return (
    <ul className={styles.list}>
      {videos.map((video) => (
        <LatestVideoItemWrapper
          key={video.id}
          video={video}
          isRemovingVideo={isRemovingVideo}
          isAddingVideo={isAddingVideo}
          updateIsAddingVideo={updateIsAddingVideo}
        />
      ))}
    </ul>
  );
};

LatestVideoListWrapper.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      collection: PropTypes.shape({
        provider: PropTypes.shape({
          logo: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
          legalName: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      duration: PropTypes.number.isRequired,
      modified: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isRemovingVideo: PropTypes.bool.isRequired,
  isAddingVideo: PropTypes.bool.isRequired,
  updateIsAddingVideo: PropTypes.func.isRequired,
};

export default LatestVideoListWrapper;
