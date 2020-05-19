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
          <div className={styles.meta}>
            <Badge text="hello" />
          </div>
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
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
