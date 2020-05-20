import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stub component for the user-supplied list of keywords.
 */
const UserList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { keywordItems, onUpdate } = props;

  return <p>Hello, world!</p>;
};

UserList.propTypes = {
  keywordItems: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  })).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserList;
