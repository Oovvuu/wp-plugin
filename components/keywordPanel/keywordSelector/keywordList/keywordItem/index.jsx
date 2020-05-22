import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/close.svg';
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

  return (
    <label className={checkboxes.keyword} htmlFor={keyword}>
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
