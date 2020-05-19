import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import OovvuuDataContext from 'components/app/context';
import ActionButton from 'components/actionButton';
import ClearIcon from 'assets/clear.svg';
import styles from './videoCard.scss';
import Badge from './badge';

/**
 * Displays an individual video with an position.
 */
const VideoCardWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const {
    positionKey,
    video: {
      collection: {
        provider: {
          logo: {
            url,
          },
        },
      },
      description,
      duration,
      modified,
      id,
      title,
    },
  } = props;
  const {
    dispatch,
  } = React.useContext(OovvuuDataContext);
  const clipLength = moment(moment.duration(duration, 'seconds').asMilliseconds()).format('mm:ss');

  /**
   * Removes a video from the position.
   */
  const removeVideo = () => {
    const confirmDialog = confirm( // eslint-disable-line no-restricted-globals
      __('Are you sure you want to remove this video?', 'oovvuu'),
    );

    if (confirmDialog === true) {
      dispatch({
        type: 'REMOVE_VIDEO',
        payload: {
          position: positionKey,
          videoId: id,
        },
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div role="img" aria-label="logo">
        <img src={url} alt="" />
      </div>
      <div className={styles.content}>
        <header>
          <h4>{title}</h4>
          <div className={styles.meta}>
            <Badge text={clipLength} />
            <Badge text={moment(modified).fromNow()} />
            <Badge text={__('XXX Embeds', 'oovvuu')} type="embed" />
          </div>
          <ActionButton
            buttonStyle="icon"
            className={styles.removeVideo}
            onClickHandler={removeVideo}
          >
            <ClearIcon />
          </ActionButton>
        </header>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

VideoCardWrapper.propTypes = {
  positionKey: PropTypes.string.isRequired,
  video: PropTypes.shape({
    collection: PropTypes.shape({
      provider: PropTypes.shape({
        logo: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    modified: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
