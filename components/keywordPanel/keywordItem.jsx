import React from 'react';
import PropTypes from 'prop-types';
import styles from './keywordSelector.scss';

const KeywordItem = (props) => {
  const {
    item: { id, isSelected, keyword },
    onToggle,
  } = props;

  return (
    <label className={styles.label} htmlFor={id}>
      <input
        className={styles.input}
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
