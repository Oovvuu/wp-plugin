import React from 'react';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
import styles from './keywordInput.scss';

const KeywordInput = (props) => {
  const { onUpdate } = props;
  const [keyword, setKeyword] = React.useState('');
  const inputRef = React.createRef();

  /**
   * Switches the keyword entry, calling onUpdate() to select
   *   and forward the entered user keyword or onRemove() to delete it.
   */
  const handleKeyDown = (event) => {
    const { RETURN, TAB } = keyCodes;
    const { keyCode } = event;

    // Trigger click handler on enter.
    if (keyCode === RETURN || keyCode === TAB) {
      const updated = { keyword: keyword.toLowerCase() };

      if (keyword) {
        // Prevent tabbing to clear selection.
        event.preventDefault();
        updated.isSelected = true;
      }

      // Clear the input.
      setKeyword('');

      onUpdate(updated);
    }
  };

  /**
   * Handles updating internal state for user input.
   *
   * @param event Event Event object.
   */
  const handleChange = (event) => {
    const { target: { value } } = event;

    setKeyword(value);
  };

  /**
   * Focus the input element on mount.
   */
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      className={styles.input}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      ref={inputRef}
      value={keyword}
    />
  );
};

KeywordInput.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default KeywordInput;
