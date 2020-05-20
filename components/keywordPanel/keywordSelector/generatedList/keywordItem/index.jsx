import React from 'react';
import PropTypes from 'prop-types';
import checkboxes from 'shared/checkboxes.scss';

/**
 * Component for a single pill for selecting and deselecting a keyword.
 */
const KeywordItem = (props) => {
  const {
    item: { id, isSelected, keyword },
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
      <span>{keyword}</span>
    </label>
  );
};

KeywordItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default KeywordItem;
