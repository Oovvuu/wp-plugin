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
  const { togglePosition } = props;

  return (
    <span className={checkboxes.toggle}>
      <label
        htmlFor={id}
        className="uppercase"
      >
        {__('Show on article', 'oovvuu')}
        <input
          className=""
          name="tag"
          id={id}
          value={__('Show on article', 'oovvuu')}
          type="checkbox"
          onChange={togglePosition}
        />
      </label>
    </span>
  );
};

PositionToggle.propTypes = {
  togglePosition: PropTypes.func.isRequired,
};

export default PositionToggle;
