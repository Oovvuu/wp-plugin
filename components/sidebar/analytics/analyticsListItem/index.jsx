import React from 'react';
import PropTypes from 'prop-types';


/**
 * The Analytics List Item container.
 */
const AnalyticsListItemWrapper = (props) => {
  const {
    data,
    title,
  } = props;

  return (
    <li>
      <span>{data}</span>
      <span>{title}</span>
    </li>
  );
};

AnalyticsListItemWrapper.propTypes = {
  data: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default AnalyticsListItemWrapper;
