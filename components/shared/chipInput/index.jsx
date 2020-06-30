import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uuid from 'react-uuid';
import keyCodes from 'utils/keyCodes';
import styles from './chipInput.scss';

const ChipInput = (props) => {
  const { i18n: { __ } } = wp;
  const {
    onUpdate,
    inputRef,
    className,
    placeholder,
    focusOnMount,
  } = props;
  const [keyword, setKeyword] = React.useState('');
  const inputId = uuid();

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
    const { TAB, RETURN } = keyCodes;
    const { keyCode } = event;

    if (keyword && [TAB, RETURN].includes(keyCode)) {
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
    if (focusOnMount) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <label
      htmlFor={inputId}
      className={classnames(styles.inputItem, className)}
    >
      <input
        id={inputId}
        autoComplete="off"
        className={styles.input}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={inputRef}
        value={keyword}
        placeholder={placeholder}
        aria-label={__('Enter a keyword', 'oovvuu')}
      />
    </label>
  );
};

ChipInput.defaultProps = {
  className: '',
  placeholder: '',
  focusOnMount: true,
};

ChipInput.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  focusOnMount: PropTypes.bool,
};

export default ChipInput;