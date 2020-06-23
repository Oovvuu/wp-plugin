import React from 'react';
import LoadingSpinner from './spinner';
import styles from './loading.scss';

/**
 * The Loading container.
 */
const LoadingWrapper = () => {
  const { i18n: { __ } } = wp;

  return (
    <div
      className={styles.wrapper}
      role="alert"
    >
      <div className={styles.popup}>
        <span className={styles.spinner}>
          <LoadingSpinner />
        </span>
        <p className={styles.message}>{__('Please wait...', 'oovvuu')}</p>
      </div>
    </div>
  );
};

export default LoadingWrapper;
