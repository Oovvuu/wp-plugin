import React from 'react';
import PropTypes from 'prop-types';
import keywords from 'components/keywordPanel/keywords.scss';

/**
 * Component for a single pill for selecting and deselecting a keyword.
 */
const KeywordItem = (props) => {
  const {
    keyword,
    isSelected,
    onToggle,
  } = props;

  return (
    <label
      className={keywords.recommended}
      htmlFor={keyword}
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
  keyword: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default KeywordItem;
