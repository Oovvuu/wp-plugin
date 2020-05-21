import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import AddIcon from 'assets/add.svg';
import ActionButton from 'components/actionButton';
import KeywordList from '../keywordList';
import styles from './userKeywordList.scss';

/**
 * Stub component for the user-supplied list of keywords.
 */
const UserList = (props) => {
  const { keywordItems, onMutate, onUpdate } = props;

  const handleAdd = () => {
    onMutate(
      'add',
      {
        id: uuid(),
        isSelected: true,
        keyword: '',
        type: 'user',
      },
    );
  };

  const handleRemove = (id) => {
    onMutate('delete', keywordItems[id]);
  };

  return (
    <div className={styles.wrapper}>
      <ActionButton
        buttonStyle="icon"
        className={styles.addUserKeyword}
        onClickHandler={handleAdd}
      >
        <AddIcon />
      </ActionButton>
      <KeywordList keywordItems={keywordItems} onRemove={handleRemove} onUpdate={onUpdate} />
    </div>
  );
};

UserList.propTypes = {
  keywordItems: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  })).isRequired,
  onMutate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserList;
