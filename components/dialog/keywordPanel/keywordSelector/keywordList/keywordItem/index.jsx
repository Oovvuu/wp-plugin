import React from 'react';
import PropTypes from 'prop-types';
import keywords from 'shared/theme.scss';

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
      className={keywords.recommendedTerm}
      htmlFor={keyword}
    >
      <input
        id={keyword}
        name={keyword}
        onChange={() => onToggle(keyword)}
        checked={isSelected}
        type="checkbox"
        aria-label={keyword}
      />
      <span aria-hidden="true">
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
