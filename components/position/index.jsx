import React from 'react';
import PropTypes from 'prop-types';
import PositionToggleWrapper from 'components/positionToggle';

/**
 * Stub component for the video position wrapper.
 */
const PositionWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const { children } = props;

  return (
    <>
      <h3>{__('Position:', 'oovvuu')}</h3>
      <PositionToggleWrapper />
      { children }
    </>
  );
};

PositionWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default PositionWrapper;
