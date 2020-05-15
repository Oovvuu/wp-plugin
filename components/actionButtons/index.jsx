import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wrapper component to create an icon button intended to trigger an action,
 *   such as closing a dialog.
 */
const ActionButtonWrapper = (props) => {
  const { children } = props;

  return <button type="button">{children}</button>;
};

ActionButtonWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default ActionButtonWrapper;
