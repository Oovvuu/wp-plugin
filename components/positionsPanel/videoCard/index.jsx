import React from 'react';
import PropTypes from 'prop-types';
import styles from './videoCard.scss';
import Badge from './badge';

/**
 * Displays an individual video with an position.
 */
const VideoCardWrapper = (props) => {
  const {
    positionKey,
    video: { title, description, collection: { provider: { logo: { url } } } },
  } = props;

  // TODO: Remove when positionKey is used.
  console.log(positionKey);

  return (
    <div className={styles.wrapper}>
      <div role="img" aria-label="logo">
        <img src={url} alt="" />
      </div>
      <div className={styles.content}>
        <header>
          <h4>{title}</h4>
          <Badge text="hello" />
        </header>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

VideoCardWrapper.propTypes = {
  positionKey: PropTypes.string.isRequired,
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    collection: PropTypes.shape({
      provider: PropTypes.shape({
        logo: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
