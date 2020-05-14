import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

const PositionWrapper = (props) => {
  const { children } = props;

  return (
    <>
      <h3>{__('Position:', 'oovvuu')}</h3>
      { children }
    </>
  );
};

PositionWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default PositionWrapper;
