import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from 'assets/clear.svg';
import ActionButton from 'components/actionButton';
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
