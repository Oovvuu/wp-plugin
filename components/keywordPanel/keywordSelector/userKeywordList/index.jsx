import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from 'assets/add.svg';
import ActionButton from 'components/actionButton';
import KeywordList from '../keywordList';
import styles from './userrKeywordList.scss';

/**
 * Stub component for the user-supplied list of keywords.
 */
const UserList = (props) => {
  const { keywordItems, onUpdate } = props;

  return (
    <div>
      <ActionButton
        buttonStyle="icon"
        className={styles.addUserKeyword}
        onClickHandler={() => true}
      >
        <AddIcon />
      </ActionButton>
      <KeywordList keywordItems={keywordItems} onUpdate={onUpdate} />
    </div>
  );
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
