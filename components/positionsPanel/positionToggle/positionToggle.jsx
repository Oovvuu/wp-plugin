import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import checkboxes from 'shared/checkboxes.scss';

/**
 * Displays the toggle to enable/disable a position.
 */
const PositionToggle = (props) => {
  const id = uuid();
  const { i18n: { __ } } = wp;
  const { togglePosition, enabled } = props;

  return (
    <span className={checkboxes.toggle}>
      <label
        htmlFor={id}
        className="uppercase"
      >
        {__('Show on article', 'oovvuu')}
        <input
          id={id}
          checked={enabled}
          type="checkbox"
          onChange={togglePosition}
        />
      </label>
    </span>
  );
};

PositionToggle.propTypes = {
  togglePosition: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default PositionToggle;
