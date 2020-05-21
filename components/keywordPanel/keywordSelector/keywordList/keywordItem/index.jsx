import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from 'assets/clear.svg';
import ActionButton from 'components/actionButton';
import keyCodes from 'utils/keyCodes';
import checkboxes from 'shared/checkboxes.scss';
import styles from './keywordItem.scss';

/**
 * Component for a single pill for selecting and deselecting a keyword.
 */
const KeywordItem = (props) => {
  const {
    item: { id, isSelected, keyword },
    onMutate,
    onToggle,
  } = props;

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
      onToggle(id);
    }
  };

  return (
    <label
      className={checkboxes.keyword}
      htmlFor={id}
      onKeyDown={handleKeyDown}
    >
      <input
        id={id}
        name={keyword}
        onChange={() => onToggle(id)}
        checked={isSelected}
        type="checkbox"
      />
      <span>{keyword}</span>
      {onMutate && (
        <ActionButton
          buttonStyle="icon"
          className={styles.removeKeyword}
          onClickHandler={onMutate}
        >
          <ClearIcon />
        </ActionButton>
      )}
    </label>
  );
};

KeywordItem.defaultProps = { onMutate: null };

KeywordItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  onMutate: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
};

export default KeywordItem;
