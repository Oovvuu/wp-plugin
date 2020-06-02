import React from 'react';
import AddIcon from 'assets/add.svg';
import ActionButton from 'components/actionButton';
import oovvuuData from 'components/app/context';
import UserKeywordItem from './userKeywordItem';
import KeywordInput from './keywordInput';
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

  // The current focus of the add keyword button.
  const [addKeywordFocus, setAddKeywordFocus] = React.useState(false);

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

    setAddKeywordFocus(false);
  };

  /**
   * Calls parent's onMutate() callback with flag to delete item. Deselects item to remove
   *   it from the list of selected keywords.
   * @param item
   */
  const handleRemove = (item) => {
    const { keyword } = item;
    dispatch({ payload: userKeywords.filter((value) => value !== keyword), type: 'UPDATE_USER_KEYWORDS' });

    setAddKeywordFocus(true);
  };

  /**
   * Adds item if the updated item is a stub. Otherwise forwards the update.
   *
   * @param item object Keyword item.
   */
  const handleUpdate = (item) => {
    const { keyword } = item;

    // Do not add a user keyword if it is already a recommended keyword.
    if (recommendedKeywords.includes(keyword)) {
      // @todo select the duplicate item if it's not already selected.
      handleRemove(item);
      return;
    }

    dispatch({ payload: [...userKeywords, keyword], type: 'UPDATE_USER_KEYWORDS' });

    setAddKeywordFocus(true);
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
        focus={addKeywordFocus}
      >
        <AddIcon />
      </ActionButton>

      <ul className={styles.keywords}>
        {Object.keys(selfKeywordItems).map((key) => (
          <li className={styles.keyword} key={selfKeywordItems[key].keyword}>
            <UserKeywordItem
              item={selfKeywordItems[key]}
              onRemove={handleRemove}
              onUpdate={handleUpdate}
            />
          </li>
        ))}

        <li className={styles.keywordInput} key="user-keyword-input">
          <KeywordInput
            item=""
            onRemove={handleRemove}
            onUpdate={handleUpdate}
          />
        </li>
      </ul>
    </div>
  );
};

export default UserList;
