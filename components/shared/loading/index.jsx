import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './loading.scss';

/**
 * The Loading container.
 */
const LoadingWrapper = () => {
  const { i18n: { __ } } = wp;
  const ColorCircularProgress = withStyles({
    root: {
      color: 'var(--color-theme)',
    },
  })(CircularProgress);

  return (
    <div
      className={styles.wrapper}
      role="alert"
    >
      <div className={styles.popup}>
        <ColorCircularProgress className={styles.spinner} size={38} thickness={3} />
        <p className={styles.message}>{__('Please wait...', 'oovvuu')}</p>
      </div>
    </div>
  );
};

export default LoadingWrapper;
