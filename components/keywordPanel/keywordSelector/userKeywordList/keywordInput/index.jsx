import React from 'react';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
import styles from './keywordInput.scss';

const KeywordInput = (props) => {
  const { onUpdate } = props;
  const [keyword, setKeyword] = React.useState('');
  const inputRef = React.createRef();

  /**
   * Adds the user-entered keyword.
   */
  const handleKeyDown = (event) => {
    const { RETURN, TAB } = keyCodes;
    const { keyCode } = event;

    // Trigger click handler on enter.
    if (keyword && (keyCode === RETURN || keyCode === TAB)) {
      event.preventDefault();

      // Clear the input.
      setKeyword('');

      onUpdate(keyword);
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
