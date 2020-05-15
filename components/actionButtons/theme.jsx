import React from 'react';
import PropTypes from 'prop-types';
import buttons from 'shared/buttons.scss';
import ActionButtonWrapper from './index';

/**
 * Creates the circle-X button used for removing video cards from positions.
 */
const ThemeButton = (props) => {
  const { children, disabled } = props;

  return (
    <ActionButtonWrapper
      style={buttons.buttonTheme}
      disabled={disabled}
    >
      {children}
    </ActionButtonWrapper>
  );
};

ThemeButton.defaultProps = {
  disabled: false,
};

ThemeButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  disabled: PropTypes.bool,
};

export default ThemeButton;
