import React from 'react';
import AddIcon from 'assets/add.svg';
import classnames from 'classnames';
import oovvuuData from 'components/app/context';
import keywords from 'components/keywordPanel/keywords.scss';
import UserKeywordItem from './userKeywordItem';
import KeywordInput from './keywordInput';
import styles from './userKeywordList.scss';

/**
 * Manages adding and deleting user-defined keywords.
 */
const UserList = () => {
  const {
    dispatch,
    state: { recommendedKeywords, userKeywords },
  } = React.useContext(oovvuuData);

  /**
   * Removes a given keyword from the userKeywords state.
   *
   * @param {string} keyword The keyword to be removed.
   */
  const handleRemove = (keyword) => {
    dispatch({ payload: userKeywords.filter((value) => value !== keyword), type: 'UPDATE_USER_KEYWORDS' });
  };

  /**
   * Adds a given keyword to the userKeywords state.
   *
   * @param item object Keyword item.
   */
  const handleUpdate = (keyword) => {
    // Do not add a user keyword if it is already a recommended keyword.
    if (recommendedKeywords.includes(keyword)) {
      // @todo select the duplicate item if it's not already selected.
      handleRemove(keyword);
      return;
    }

    dispatch({ payload: [...userKeywords, keyword], type: 'UPDATE_USER_KEYWORDS' });
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.addIcon}>
        <AddIcon />
      </span>

      <ul className={styles.list}>
        {userKeywords.map((keyword) => (
          <li
            className={classnames(styles.item, keywords.user)}
            key={keyword}
          >
            <UserKeywordItem
              keyword={keyword}
              onRemove={() => { handleRemove(keyword); }}
            />
          </li>
        ))}

        <li className={styles.inputItem}>
          <KeywordInput onUpdate={handleUpdate} />
        </li>
      </ul>
    </div>
  );
};

export default UserList;
