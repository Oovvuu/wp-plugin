import React from 'react';
import PropTypes from 'prop-types';

const UserList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { keywordItems, onAdd, onRemove } = props;

  return <p>Hello, world!</p>;
};

UserList.propTypes = {
  keywordItems: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  })).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UserList;
