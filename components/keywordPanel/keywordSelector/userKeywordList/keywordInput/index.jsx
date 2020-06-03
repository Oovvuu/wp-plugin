import React from 'react';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
import styles from 'shared/checkboxes.scss';

const KeywordInput = (props) => {
  const { i18n: { __ } } = wp;
  const {
    item, onRemove, onUpdate,
  } = props;
  const [keyword, setKeyword] = React.useState(item.keyword);
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
      const callback = keyword ? onUpdate : onRemove;
      const updated = { ...item, ...{ keyword: keyword.toLowerCase() } };

      if (keyword) {
        // Prevent tabbing to clear selection.
        event.preventDefault();
        updated.isSelected = true;
      }

      // Clear the input.
      setKeyword('');

      callback(updated);
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
      placeholder={__('Enter keyword', 'oovvuu')}
      ref={inputRef}
      value={keyword}
    />
  );
};

KeywordInput.propTypes = {
  item: PropTypes.shape({
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default KeywordInput;
