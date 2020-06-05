import React from 'react';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
import keywords from 'shared/theme.scss';

/**
 * Component for a single pill for selecting and deselecting a keyword.
 */
const KeywordItem = (props) => {
  const {
    item,
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
      className={keywords.recommendedTerm}
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
    </label>
  );
};

KeywordItem.propTypes = {
  item: PropTypes.shape({
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default KeywordItem;
