import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/close.svg';
import keyCodes from 'utils/keyCodes';
import checkboxes from 'shared/checkboxes.scss';
import styles from './keywordItem.scss';

/**
 * Component for a single pill for selecting and deselecting a keyword.
 */
const KeywordItem = (props) => {
  const {
    item,
    onRemove,
    onToggle,
  } = props;
  const { isSelected, keyword } = item;

  /**
   * Allow users to press enter when the chip is active to toggle the state of
   * the chip.
   *
   * @param  {Event} event The keypress event.
   */
  const handleKeyDown = (event) => {
    const { RETURN } = keyCodes;
    const { keyCode } = event;

    // Enter key is pressed.
    if (RETURN === keyCode) {
      onToggle(keyword);
    }
  };

  return (
    <label
      className={checkboxes.keyword}
      htmlFor={keyword}
      onKeyDown={handleKeyDown}
    >
      <input
        id={keyword}
        name={keyword}
        onChange={() => onToggle(keyword)}
        checked={isSelected}
        type="checkbox"
      />
      <span>
        {keyword}
      </span>
      {onRemove && typeof onRemove === 'function' && (
        <button className={styles.removeKeyword} onClick={() => onRemove(item)} type="button">
          <CloseIcon />
        </button>
      )}
    </label>
  );
};

KeywordItem.defaultProps = { onRemove: null };

KeywordItem.propTypes = {
  item: PropTypes.shape({
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
};

export default KeywordItem;
