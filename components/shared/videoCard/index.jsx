import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import truncate from 'truncate';
import styles from './videoCard.scss';
import Badge from './badge';

/**
 * Displays an individual videoCard with an position.
 */
const VideoCardWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const {
    summary,
    clipLength,
    modified,
    title,
    url,
    legalName,
  } = props;

  return (
    <>
      <div className={styles.logo}>
        <img src={url} alt={legalName} draggable="false" />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.meta}>
        <Badge text={clipLength} />
        <Badge text={moment(modified).fromNow()} />
        <Badge text={__('XXX Embeds', 'oovvuu')} type="embed" />
      </div>
      <p className={styles.description}>{truncate(summary, 272)}</p>
    </>
  );
};

VideoCardWrapper.propTypes = {
  summary: PropTypes.string.isRequired,
  clipLength: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  legalName: PropTypes.string.isRequired,
};

export default VideoCardWrapper;
