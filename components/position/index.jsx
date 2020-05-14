import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import PositionToggleWrapper from 'components/positionToggle';

const PositionWrapper = (props) => {
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
