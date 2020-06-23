import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * The Loading indicator spinner.
 */
const LoadingSpinner = () => {
  const ColorCircularProgress = withStyles({
    root: {
      color: 'var(--oovvuu-color-theme)',
      display: 'block',
      margin: '0 auto',
    },
  })(CircularProgress);

  return <ColorCircularProgress size={38} thickness={3} />;
};

export default LoadingSpinner;
