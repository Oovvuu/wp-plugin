import React from 'react';
import eventBus from 'services/eventBus';
import AddIcon from 'assets/add.svg';
import oovvuuData from 'components/app/context';
import ChipItem from 'components/shared/chipItem';
import ChipInput from 'components/shared/chipInput';
import useEffectFlashTimer from 'utils/useEffectFlashTimer';
import styles from './userKeywordList.scss';

/**
 * Manages adding and deleting user-defined keywords.
 */
const UserList = () => {
  const { i18n: { __, sprintf, _n } } = wp;
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
  const inputRef = React.useRef(null);
  const [duplicateIndex, setDuplicateIndex] = React.useState(-1);

  /**
   * Removes a given keyword from the userKeywords state.
   *
   * @param {string} keyword The keyword to be removed.
   */
  const handleRemove = (keyword) => {
    // Update local state for aria-live region.
    setLastAction(`${keyword} removed.`);

    dispatch({ payload: userKeywords.filter((value) => value !== keyword), type: 'UPDATE_USER_KEYWORDS' });
    inputRef.current.focus();
  };

  /**
   * Adds a given keyword to the userKeywords state.
   *
   * @param item object Keyword item.
   */
  const handleUpdate = (keyword) => {
    // Do not add a user keyword if it already exists.
    if (userKeywords.includes(keyword)) {
      setDuplicateIndex(userKeywords.indexOf(keyword));
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
   * Handle clicks on `add button` skip link.
   *
   * @param  {Event} event The event object.
   */
  const onAddClick = (event) => {
    event.preventDefault();
    inputRef.current.focus();
  };

  /**
   * Compile the aria-live region's message string.
   */
  React.useEffect(() => {
    const updatedMessage = sprintf(
      _n('%d keyword total.', '%d keywords total.', userKeywords.length, 'oovvuu'),
      userKeywords.length,
    );

    setLiveRegionMessage(`${lastAction} ${updatedMessage}`);
  }, [lastAction]);

  /**
   * Clear the flash after we've flashed the duplicate item.
   */
  React.useEffect(() => {
    useEffectFlashTimer(duplicateIndex, setDuplicateIndex);
  }, [duplicateIndex]);

  React.useEffect(() => {
    /**
     * Focus the input ref.
     */
    const focusInput = () => {
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
    };

    eventBus.on('focusUserKeywordInput', focusInput);

    return () => {
      eventBus.remove('focusUserKeywordInput', focusInput);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <a
        className={styles.addIcon}
        aria-label={__('Skip to keyword text field', 'oovvuu')}
        href="#user-keyword-input"
        onClick={onAddClick}
      >
        <AddIcon />
      </a>

      <div className={styles.list}>
        {userKeywords.map((keyword, index) => (
          <ChipItem
            key={keyword}
            keyword={keyword}
            handleRemove={handleRemove}
            flash={index === duplicateIndex}
          />
        ))}

        <ChipInput
          onUpdate={handleUpdate}
          inputRef={inputRef}
          className={styles.inputItem}
        />
      </div>
      <span
        className="screen-reader-only"
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="text"
        id="form-action-text"
      >
        <span>{liveRegionMessage}</span>
      </span>
    </div>
  );
};

export default UserList;
