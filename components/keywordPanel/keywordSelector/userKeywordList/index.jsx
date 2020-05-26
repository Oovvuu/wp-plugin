import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from 'assets/add.svg';
import ActionButton from 'components/actionButton';
import KeywordList from '../keywordList';
import styles from './userKeywordList.scss';

/**
 * Manages adding and deleting user-defined keywords. Wraps the KeywordList component
 *   and passes through the onRemove() callback to enable editable functionality.
 */
const UserList = (props) => {
  const { keywordItems, onMutate, onUpdate } = props;

  // Need to keep a separate list to handle stubbing in a user-defined keyword.
  const [selfKeywordItems, setSelfKeywordItems] = React.useState(keywordItems);

  /**
   * Stubs in a user-defined keyword item for input.
   */
  const handleAdd = () => {
    setSelfKeywordItems({
      ...selfKeywordItems,
      ...{
        STUB: {
          isSelected: false,
          isStub: true,
          keyword: '',
          type: 'user',
        },
      },
    });
  };

  /**
   * Adds item if the updated item is a stub. Otherwise forwards the update.
   * @param item object Keyword item.
   */
  const handleUpdate = (item) => {
    if (item.isStub) {
      const { isSelected, keyword, type } = item;
      onMutate('add', { isSelected, keyword, type });
    } else {
      onUpdate(item);
    }
  };

  /**
   * Calls parent's onMutate() callback with flag to delete item. Deselects item to remove
   *   it from the list of selected keywords.
   * @param item
   */
  const handleRemove = (item) => {
    onMutate('delete', { ...item, ...{ isSelected: false } });
  };

  React.useEffect(() => {
    setSelfKeywordItems(keywordItems);
  }, [keywordItems]);

  return (
    <div className={styles.wrapper}>
      <ActionButton
        buttonStyle="icon"
        className={styles.addUserKeyword}
        onClickHandler={handleAdd}
      >
        <AddIcon />
      </ActionButton>
      <KeywordList
        keywordItems={selfKeywordItems}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

UserList.propTypes = {
  keywordItems: PropTypes.objectOf(PropTypes.shape({
    keyword: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  })).isRequired,
  onMutate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserList;
