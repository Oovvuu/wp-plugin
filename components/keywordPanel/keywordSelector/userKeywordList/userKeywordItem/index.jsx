import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CloseIcon from 'assets/close.svg';
import styles from './userKeywordItem.scss';

/**
 * Component for a single pill for presenting a user-defined keyword.
 */
const UserKeywordItem = (props) => {
  const { i18n: { __ } } = wp;
  const {
    keyword,
    handleRemove,
  } = props;

  const textId = keyword.replace(/\s/g, '-');
  const buttonId = `remove-${textId}`;

  return (
    <span
      className={classnames(styles.item, styles.user)}
      role="row"
    >
      <span
        id={textId}
        role="gridcell"
      >
        {keyword}
      </span>
      <div
        role="gridcell"
      >
        <button
          id={buttonId}
          onClick={() => handleRemove(keyword)}
          type="button"
          aria-label={__('Remove', 'oovvuu')}
          aria-labelledby={`${buttonId} ${textId}`}
        >
          <CloseIcon />
        </button>
      </div>
    </span>
  );
};

UserKeywordItem.propTypes = {
  keyword: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default UserKeywordItem;
