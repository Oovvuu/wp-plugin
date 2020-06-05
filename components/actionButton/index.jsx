import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    className,
    focus,
  } = props;

  const buttonStyles = {
    button: buttons.button,
    collapse: buttons.buttonCollapse,
    icon: buttons.buttonIcon,
    primary: buttons.buttonTheme,
    warn: buttons.buttonWarn,
    warnLarge: buttons.buttonWarnLarge,
  };

  // Reference to the action button.
  const ref = React.useRef();

  // Set focus to button when focus is true.
  React.useEffect(() => {
    if (focus) {
      ref.current.focus();
    }
  }, [focus]);

  return (
    <button
      className={classNames(buttonStyles[buttonStyle], className)}
      type="button"
      disabled={disabled}
      onClick={onClickHandler}
      ref={ref}
    >
      <span>{children}</span>
    </button>
  );
};

ActionButton.defaultProps = {
  buttonStyle: 'button',
  className: '',
  disabled: false,
  focus: false,
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
  className: PropTypes.string,
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
};

export default ActionButton;
