import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CloseIcon from 'assets/close.svg';
import keywords from 'components/keywordPanel/keywords.scss';
import styles from './userKeywordItem.scss';

/**
 * Component for a single pill for presenting a user-defined keyword.
 */
const UserKeywordItem = (props) => {
  const { i18n: { __ } } = wp;
  const {
    keyword,
    onRemove,
  } = props;

  const textIdRef = keyword.replace(/\s/g, '-');
  const buttonIdRef = `remove-${textIdRef}`;

  return (
    <span
      className={classnames(styles.item, keywords.user)}
      role="row"
    >
      <div
        id={textIdRef}
        role="gridcell"
      >
        <span>{keyword}</span>
      </div>
      <span
        role="gridcell"
      >
        <button
          id={buttonIdRef}
          onClick={onRemove}
          type="button"
          aria-label={__('Remove', 'oovvuu')}
          aria-labelledby={`${buttonIdRef} ${textIdRef}`}
        >
          <CloseIcon />
        </button>
      </span>
    </span>
  );
};

UserKeywordItem.propTypes = {
  keyword: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UserKeywordItem;
