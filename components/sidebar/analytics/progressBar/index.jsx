import React from 'react';
import PropTypes from 'prop-types';
import styles from './progressBar.scss';

const ProgressBar = ({ width, percent }) => {
  const value = percent * width;
  return (
    <div>
      <div className={styles.parent} style={{ width }}>
        <div style={{ width: `${value}px` }} className={styles.progress} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  width: PropTypes.string.isRequired,
  percent: PropTypes.string.isRequired,
};

export default ProgressBar;
