import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'assets/close.svg';

/**
 * Component for a single pill for presenting a user-defined keyword.
 */
const UserKeywordItem = (props) => {
  const { i18n: { __ } } = wp;
  const {
    keyword,
    onRemove,
  } = props;

  return (
    <>
      <span>
        {keyword}
      </span>
      <button
        onClick={onRemove}
        type="button"
        aria-label={`${__('Remove', 'oovvuu')} ${keyword}`}
      >
        <CloseIcon />
      </button>
    </>
  );
};

UserKeywordItem.propTypes = {
  keyword: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UserKeywordItem;
