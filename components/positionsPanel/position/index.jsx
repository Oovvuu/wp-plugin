import React from 'react';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import getHumanReadableEmptyReason from 'services/getHumanReadableEmptyReason';
import classnames from 'classnames';
import theme from 'shared/theme.scss';
import Notice from './notice';
import PositionToggleWrapper from './positionToggle';
import VideoCardWrapper from './videoCard';
import PlayerWrapper from './player';
import styles from './position.scss';

/**
 * Handles logic for displaying a specific position.
 */
const PositionWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const {
    enabled, positionEmptyReason, positionKey, title, videos,
  } = props;

  const {
    state: {
      currentDraggingVideo,
    },
  } = React.useContext(OovvuuDataContext);

  return (
    <div className={classnames(styles.panel, theme.panel)}>
      <div className={classnames(styles.wrapper, { [styles.disabled]: !enabled })}>
        <header className={styles.positionHeader}>
          <h3 className={styles.title}>
            <span>{__('Position:', 'oovvuu')}</span>
            {` ${title}`}
          </h3>
          <PositionToggleWrapper
            positionKey={positionKey}
            positionEmptyReason={positionEmptyReason}
          />
        </header>
        <div className={styles.content}>
          {positionEmptyReason
            ? (
              <Notice
                content={getHumanReadableEmptyReason(positionEmptyReason)}
              />
            )
            : (
              <>
                <div className={classnames(
                  styles.playerWrapper,
                  theme.panel,
                  styles.brightcovePlayer,
                )}
                >
                  <PlayerWrapper videos={videos} />
                </div>
                <div className={classnames(
                  styles.cardsWrapper,
                  { [styles.dropZone]: currentDraggingVideo.videoId !== undefined },
                )}
                >
                  {videos.map((video, index) => (
                    <VideoCardWrapper
                      key={video.id}
                      index={index}
                      positionKey={positionKey}
                      video={video}
                    />
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

PositionWrapper.defaultProps = {
  enabled: true,
  positionEmptyReason: null,
  title: '',
};

PositionWrapper.propTypes = {
  enabled: PropTypes.bool,
  positionKey: PropTypes.string.isRequired,
  positionEmptyReason: PropTypes.string,
  title: PropTypes.string,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default PositionWrapper;
