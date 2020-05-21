import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from 'assets/close.svg';
import checkboxes from 'shared/checkboxes.scss';
import styles from './keywordItem.scss';

/**
 * Component for a single pill for selecting and deselecting a keyword.
 */
const KeywordItem = (props) => {
  const {
    item: { id, isSelected, keyword },
    onRemove,
    onToggle,
  } = props;

  return (
    <label className={checkboxes.keyword} htmlFor={id}>
      <input
        id={id}
        name={keyword}
        onChange={() => onToggle(id)}
        checked={isSelected}
        type="checkbox"
      />
      <span>
        {keyword}
      </span>
      {onRemove && typeof onRemove === 'function' && (
        <button className={styles.removeKeyword} onClick={() => onRemove(id)} type="button">
          <ClearIcon />
        </button>
      )}
    </label>
  );
};

KeywordItem.defaultProps = { onRemove: null };

KeywordItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
};

export default KeywordItem;
