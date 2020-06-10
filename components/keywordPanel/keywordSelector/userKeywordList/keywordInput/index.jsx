import React from 'react';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
import styles from './keywordInput.scss';

const KeywordInput = (props) => {
  const { i18n: { __ } } = wp;
  const { onUpdate } = props;
  const [keyword, setKeyword] = React.useState('');
  const inputRef = React.createRef();

  /**
   * Adds the user-entered keyword when the form is submitted.
   *
   * @param {Event} event The event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (keyword) {
      // Clear the input.
      setKeyword('');

      onUpdate(keyword);
    }
  };

  /**
   * Patches in support for submitting the form with the TAB key.
   *
   * @param {Event} event The event object.
   */
  const handleKeyDown = (event) => {
    const { TAB } = keyCodes;
    const { keyCode } = event;

    if (keyword && TAB === keyCode) {
      handleSubmit(event);
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
    <label
      htmlFor="keyword-input"
    >
      <input
        autoComplete="off"
        className={styles.input}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={inputRef}
        value={keyword}
        name="keyword-input"
        aria-label={__('Enter a keyword', 'oovvuu')}
      />
    </label>
  );
};

KeywordInput.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default KeywordInput;
