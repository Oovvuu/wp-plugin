import React from 'react';
import PropTypes from 'prop-types';
import buttons from 'shared/buttons.scss';

/**
 * Wrapper component to create a button with text and optional icon intended to
 * trigger an action.
 *
 * Note: The inner span is required for flex layout.
 */
const ActionButtonWrapper = (props) => {
  const {
    children,
    disabled,
    buttonStyle,
    onClickHandler,
  } = props;

  const buttonStyles = {
    button: buttons.button,
    primary: buttons.buttonTheme,
    warn: buttons.buttonWarn,
    warnLarge: buttons.buttonWarnLarge,
    collapse: buttons.buttonCollapse,
  };

  return (
    <button
      className={buttonStyles[buttonStyle]}
      type="button"
      disabled={disabled}
      onClick={onClickHandler}
    >
      <span>{children}</span>
    </button>
  );
};

ActionButtonWrapper.defaultProps = {
  buttonStyle: 'button',
  disabled: false,
};

ActionButtonWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  buttonStyle: PropTypes.oneOf([
    'button',
    'primary',
    'warn',
    'warnLarge',
    'collapse',
  ]),
  disabled: PropTypes.bool,
};

export default ActionButtonWrapper;
