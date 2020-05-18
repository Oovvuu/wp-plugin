import React from 'react';
import PropTypes from 'prop-types';
import PositionToggleWrapper from 'components/positionToggle';
import styles from './position.scss';

/**
 * Stub component for the video position wrapper.
 */
const PositionWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const { children, label } = props;

  return (
    <div className={styles.wrapper}>
      <header>
        <h3 className={styles.title}>
          <span>{__('Position:', 'oovvuu')}</span>
          {` ${label}`}
        </h3>
        <PositionToggleWrapper />
      </header>
      <div className={styles.content}>
        { children }
      </div>
    </div>
  );
};

PositionWrapper.defaultProps = { label: '' };

PositionWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  label: PropTypes.string,
};

export default PositionWrapper;
