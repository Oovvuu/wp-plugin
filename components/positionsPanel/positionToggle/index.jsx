import React from 'react';
import uuid from 'react-uuid';
import checkboxes from 'shared/checkboxes.scss';

/**
 * Displays the toggle to enable/disable a position.
 */
const PositionToggleWrapper = () => {
  const id = uuid();
  const { i18n: { __ } } = wp;

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
        />
      </label>
    </span>
  );
};

export default PositionToggleWrapper;
