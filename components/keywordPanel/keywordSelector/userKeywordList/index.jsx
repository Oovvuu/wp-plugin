import React from 'react';
import AddIcon from 'assets/add.svg';
import ActionButton from 'components/actionButton';
import oovvuuData from 'components/app/context';
import KeywordList from '../keywordList';
import styles from './userKeywordList.scss';

/**
 * Manages adding and deleting user-defined keywords. Wraps the KeywordList component
 *   and passes through the onRemove() callback to enable editable functionality.
 */
const UserList = () => {
  const {
    dispatch,
    state: { recommendedKeywords, userKeywords },
  } = React.useContext(oovvuuData);

  // Need to keep a separate list to handle stubbing in a user-defined keyword.
  const [selfKeywordItems, setSelfKeywordItems] = React.useState({});

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
   * Calls parent's onMutate() callback with flag to delete item. Deselects item to remove
   *   it from the list of selected keywords.
   * @param item
   */
  const handleRemove = (item) => {
    const { keyword } = item;
    dispatch({ payload: userKeywords.filter((value) => value !== keyword), type: 'UPDATE_USER_KEYWORDS' });
  };

  /**
   * Adds item if the updated item is a stub. Otherwise forwards the update.
   * @param item object Keyword item.
   */
  const handleUpdate = (item) => {
    const { keyword } = item;

    // Do not add a user keyword if it is already a recommended keyword.
    if (recommendedKeywords.includes(keyword)) {
      handleRemove(item);
      return;
    }

    dispatch({ payload: [...userKeywords, keyword], type: 'UPDATE_USER_KEYWORDS' });
  };

  /**
   * Side effect to compile the master index of all keyword items, used for tracking
   *   state throughout the selector tree.
   *
   * @param  {Array} selectionList An array list of the currently selected keyword strings.
   */
  const compileAllKeywordItems = (selectionList) => {
    const indexedKeywords = userKeywords.reduce((carry, keyword) => ({
      ...carry,
      ...{
        [keyword]: {
          isSelected: selectionList.includes(keyword), keyword, type: 'user',
        },
      },
    }), {});

    setSelfKeywordItems({ ...indexedKeywords });
  };

  React.useEffect(() => {
    compileAllKeywordItems(userKeywords);
  }, [userKeywords]);

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

export default UserList;
