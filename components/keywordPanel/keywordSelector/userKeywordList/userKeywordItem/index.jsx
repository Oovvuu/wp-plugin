import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/close.svg';
import chip from 'shared/chip.scss';

/**
 * Component for a single pill for presenting a user-defined keyword.
 */
const UserKeywordItem = (props) => {
  const {
    keyword,
    onRemove,
  } = props;

  return (
    <label
      className={chip.wrapper}
      htmlFor={keyword}
    >
      <span>
        {keyword}
      </span>
      <button
        onClick={onRemove}
        type="button"
      >
        <CloseIcon />
      </button>
    </label>
  );
};

UserKeywordItem.propTypes = {
  keyword: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UserKeywordItem;
