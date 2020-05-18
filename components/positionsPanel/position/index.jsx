import React from 'react';
import PropTypes from 'prop-types';
import PlayerWrapper from 'components/positionsPanel/player';
import PositionToggleWrapper from 'components/positionsPanel/positionToggle';
import VideoCardWrapper from 'components/positionsPanel/videoCard';
import styles from 'components/positionsPanel/positionsPanel.scss';

/**
 * Handles logic for displaying a specific position.
 */
const PositionWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const { title, videos } = props;

  return (
    <div className={styles.wrapper}>
      <header>
        <h3 className={styles.title}>
          <span>{__('Position:', 'oovvuu')}</span>
          {` ${title}`}
        </h3>
        <PositionToggleWrapper />
      </header>
      <div className={styles.content}>
        <PlayerWrapper videos={videos} />
        {videos.map((video) => (
          <VideoCardWrapper key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

PositionWrapper.defaultProps = { title: '' };

PositionWrapper.propTypes = {
  title: PropTypes.string,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default PositionWrapper;
