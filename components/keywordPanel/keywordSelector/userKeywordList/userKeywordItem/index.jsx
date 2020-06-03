import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/close.svg';
import chip from 'shared/chip.scss';

/**
 * Component for a single pill for selecting and deselecting a keyword.
 */
const UserKeywordItem = (props) => {
  const {
    item,
    onRemove,
  } = props;
  const { keyword } = item;

  return (
    <label
      className={chip.wrapper}
      htmlFor={keyword}
    >
      <span>
        {keyword}
      </span>
      <button
        onClick={() => onRemove(item)}
        type="button"
      >
        <CloseIcon />
      </button>
    </label>
  );
};

UserKeywordItem.defaultProps = { onRemove: null };

UserKeywordItem.propTypes = {
  item: PropTypes.shape({
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
};

export default UserKeywordItem;
