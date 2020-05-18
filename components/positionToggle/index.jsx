import React from 'react';
import styles from './positionToggle.scss';

/**
 * Stub component for position toggle wrapper component.
 */
const PositionToggleWrapper = () => (
  <span className={styles.toggle}>
    <label
      htmlFor="toggle-1"
      className="uppercase"
    >
      Show on article
      <input
        className=""
        name="tag"
        id="toggle-1"
        value="Show on article"
        type="checkbox"
      />
    </label>
  </span>
);

export default PositionToggleWrapper;
