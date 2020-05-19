import React from 'react';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import ActionButton from 'components/actionButton';
import CloseIcon from 'assets/close.svg';
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
      title,
    },
  } = props;
  const {
    dispatch,
  } = React.useContext(OovvuuDataContext);

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
            <Badge text="hello" />
          </div>
          <ActionButton
            buttonStyle="collapse"
            onClickHandler={removeVideo}
          >
            <CloseIcon />
          </ActionButton>
        </header>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

VideoCardWrapper.defaultProps = { positionKey: 'hero' };

VideoCardWrapper.propTypes = {
  positionKey: PropTypes.string,
  video: PropTypes.shape({
    collection: PropTypes.shape({
      provider: PropTypes.shape({
        logo: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
