import React from 'react';
import PropTypes from 'prop-types';

const ActionButtonWrapper = (props) => {
  const { children } = props;

  return <button type="button">{children}</button>;
};

ActionButtonWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default ActionButtonWrapper;
