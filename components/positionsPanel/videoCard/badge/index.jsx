import React from 'react';
import PropTypes from 'prop-types';

const Badge = (props) => {
  const {
    text,
    /* eslint-disable */
    bgColor,
    icon,
     /* eslint-enable */
  } = props;

  return (
    <span>{text}</span>
  );
};

Badge.defaultProps = {
  bgColor: 'grey',
  icon: () => true,
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  icon: PropTypes.func,
};


export default Badge;
