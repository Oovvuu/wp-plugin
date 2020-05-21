import React from 'react';
import PropTypes from 'prop-types';
import KeywordList from '../keywordList';

/**
 * Stub component for the user-supplied list of keywords.
 */
const UserList = (props) => {
  const { keywordItems, onUpdate } = props;

  return <KeywordList keywordItems={keywordItems} onUpdate={onUpdate} />;
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
