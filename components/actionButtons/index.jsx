import React from 'react';
import PropTypes from 'prop-types';
import buttons from 'shared/buttons.scss';

/**
 * Wrapper component to create an icon button intended to trigger an action,
 *   such as closing a dialog.
 */
const ActionButtonWrapper = (props) => {
  const { children, style, disabled } = props;

  return (
    <button
      className={style}
      type="button"
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

ActionButtonWrapper.defaultProps = {
  style: buttons.button,
  disabled: false,
};

ActionButtonWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  style: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ActionButtonWrapper;
