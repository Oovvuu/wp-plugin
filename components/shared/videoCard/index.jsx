import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import truncate from 'truncate';
import dialogStyles from './videoCard.large.scss';
import sidebarStyles from './videoCard.small.scss';
import Badge from './badge';

/**
 * Displays an individual videoCard.
 */
const VideoCardWrapper = (props) => {
  const {
    summary,
    clipLength,
    modified,
    title,
    url,
    legalName,
    size,
  } = props;

  const styles = (size === 'large') ? dialogStyles : sidebarStyles;

  return (
    <>
      <div className={styles.logo}>
        <img src={url} alt={legalName} draggable="false" />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={classnames(styles.meta, { smallBadges: (size === 'small') })}>
        <Badge text={clipLength} />
        <Badge text={moment(modified).fromNow()} />
      </div>
      {summary && <p className={styles.description}>{truncate(summary, 272)}</p>}
    </>
  );
};

VideoCardWrapper.defaultProps = {
  summary: '',
  size: 'large',
};

VideoCardWrapper.propTypes = {
  summary: PropTypes.string,
  clipLength: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  legalName: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default VideoCardWrapper;
