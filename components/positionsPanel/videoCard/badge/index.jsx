import React from 'react';
import PropTypes from 'prop-types';
import CheckCircle from 'assets/check-circle.svg';
import styles from './badge.scss';

const Badge = (props) => {
  const { text, type } = props;

  return (
    <span className={`${styles.meta} ${styles.uppercase}`}>
      {type === 'embed' && <CheckCircle />}
      {text}
    </span>
  );
};

Badge.defaultProps = { type: 'default' };

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};


export default Badge;
