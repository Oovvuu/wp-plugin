import React from 'react';
import AddIcon from 'assets/add.svg';
import oovvuuData from 'components/app/context';
import UserKeywordItem from './userKeywordItem';
import KeywordInput from './keywordInput';
import styles from './userKeywordList.scss';

/**
 * Manages adding and deleting user-defined keywords.
 */
const UserList = () => {
  const { i18n: { __ } } = wp;
  const {
    dispatch,
    state: {
      recommendedKeywords,
      userKeywords,
      selectedKeywords,
    },
  } = React.useContext(oovvuuData);
  const [lastAction, setLastAction] = React.useState('');
  const [liveRegionMessage, setLiveRegionMessage] = React.useState('');

  /**
   * Removes a given keyword from the userKeywords state.
   *
   * @param {string} keyword The keyword to be removed.
   */
  const handleRemove = (keyword) => {
    // Update local state for aria-live region.
    setLastAction(`${keyword} removed.`);

    dispatch({ payload: userKeywords.filter((value) => value !== keyword), type: 'UPDATE_USER_KEYWORDS' });
  };

  /**
   * Adds a given keyword to the userKeywords state.
   *
   * @param item object Keyword item.
   */
  const handleUpdate = (keyword) => {
    // Do not add a user keyword if it already exists.
    if (userKeywords.includes(keyword)) {
      return;
    }

    // Handle duplicate keywords.
    if (recommendedKeywords.includes(keyword)) {
      // Select the duplicate item if it's not already selected.
      if (!selectedKeywords.includes(keyword)) {
        dispatch({ payload: [...selectedKeywords, keyword], type: 'UPDATE_SELECTED_KEYWORDS' });
      }

      return;
    }

    // Update local state for aria-live region.
    setLastAction(`${keyword} added.`);

    dispatch({ payload: [...userKeywords, keyword], type: 'UPDATE_USER_KEYWORDS' });
  };

  /**
   * Compile the aria-live region's message string.
   */
  React.useEffect(() => {
    const keywordCount = userKeywords.length;
    const countDescription = (keywordCount === 1)
      ? __('keyword total.', 'oovvuu')
      : __('keywords total.', 'oovvuu');

    setLiveRegionMessage(`${lastAction} ${keywordCount} ${countDescription}`);
  }, [lastAction]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.addIcon}>
        <AddIcon />
      </span>

      <div
        className={styles.list}
        role="grid"
        aria-labelledby="user-keywords-heading"
      >
        {userKeywords.map((keyword) => (
          <UserKeywordItem
            key={keyword}
            keyword={keyword}
            onRemove={() => { handleRemove(keyword); }}
          />
        ))}

        <KeywordInput onUpdate={handleUpdate} />
      </div>
      <div className="screen-reader-only">
        {__('Last change to keywords list:', 'oovvuu')}
        <span
          aria-live="polite"
          aria-relevant="additions removals"
          id="form-action-text"
        >
          {liveRegionMessage}
        </span>
      </div>
    </div>
  );
};

export default UserList;
