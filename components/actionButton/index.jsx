import React from 'react';
import PropTypes from 'prop-types';
import buttons from './actionButton.scss';

/**
 * Wrapper component to create a button with text and optional icon intended to
 * trigger an action.
 *
 * Note: The inner span is required for flex layout.
 */
const ActionButton = (props) => {
  const {
    children,
    disabled,
    buttonStyle,
    onClickHandler,
  } = props;

  const buttonStyles = {
    button: buttons.button,
    collapse: buttons.buttonCollapse,
    icon: buttons.buttonIcon,
    primary: buttons.buttonTheme,
    warn: buttons.buttonWarn,
    warnLarge: buttons.buttonWarnLarge,
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

ActionButton.defaultProps = {
  buttonStyle: 'button',
  disabled: false,
};

ActionButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  buttonStyle: PropTypes.oneOf([
    'button',
    'collapse',
    'icon',
    'primary',
    'warn',
    'warnLarge',
  ]),
  disabled: PropTypes.bool,
};

export default ActionButton;
