import React from 'react';
import PropTypes from 'prop-types';
import icon from 'assets/check-circle.svg';
import styles from './badge.scss';

const Badge = (props) => {
  const { text, type } = props;

  return (
    <>
      {type === 'embed' && icon}
      <span className={`${styles.meta} ${styles.uppercase}`}>{text}</span>
    </>
  );
};

Badge.defaultProps = { type: 'default' };

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};


export default Badge;
