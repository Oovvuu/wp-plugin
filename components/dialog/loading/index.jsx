import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import OovvuuDataContext from 'components/app/context';
import styles from './loading.scss';

/**
 * The Loading container.
 */
const LoadingWrapper = () => {
  const {
    state: {
      loadingAttributes: {
        message,
      },
    },
  } = React.useContext(OovvuuDataContext);

  const ColorCircularProgress = withStyles({
    root: {
      color: 'var(--color-theme)',
    },
  })(CircularProgress);

  return (
    <div className={styles.wrapper}>
      <div className={styles.popup}>
        <ColorCircularProgress className={styles.spinner} size={38} thickness={3} />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default LoadingWrapper;
