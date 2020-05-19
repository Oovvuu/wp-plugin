import React from 'react';
import PropTypes from 'prop-types';
import PlayerWrapper from 'components/positionsPanel/player';
import PositionToggleWrapper from 'components/positionsPanel/positionToggle';
import VideoCardWrapper from 'components/positionsPanel/videoCard';
import styles from 'components/positionsPanel/positionsPanel.scss';
import classnames from 'classnames';

/**
 * Handles logic for displaying a specific position.
 */
const PositionWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const {
    positionKey, title, videos, enabled,
  } = props;

  return (
    <div className={classnames(styles.wrapper, { [styles.disabled]: !enabled })}>
      <header>
        <h3 className={styles.title}>
          <span>{__('Position:', 'oovvuu')}</span>
          {` ${title}`}
        </h3>
        <PositionToggleWrapper
          positionKey={positionKey}
        />
      </header>
      <div className={styles.content}>
        <PlayerWrapper videos={videos} />
        {videos.map((video) => (
          <VideoCardWrapper
            positionKey={positionKey}
            key={video.id}
            video={video}
          />
        ))}
      </div>
    </div>
  );
};

PositionWrapper.defaultProps = {
  title: '',
  enabled: true,
};

PositionWrapper.propTypes = {
  positionKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  enabled: PropTypes.bool,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default PositionWrapper;
