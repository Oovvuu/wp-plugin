import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import styles from './positionToggle.scss';

/**
 * Displays the toggle to enable/disable a position.
 */
const PositionToggle = (props) => {
  const id = uuid();
  const { i18n: { __ } } = wp;
  const { enabled, onTogglePosition } = props;

  return (
    <span className={styles.toggle}>
      <label
        htmlFor={id}
      >
        {__('Show on article', 'oovvuu')}
        <input
          id={id}
          checked={enabled}
          type="checkbox"
          onChange={onTogglePosition}
        />
      </label>
    </span>
  );
};

PositionToggle.propTypes = {
  onTogglePosition: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default PositionToggle;
