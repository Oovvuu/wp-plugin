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

  return (
    <span className={classnames(styles.item, keywords.user)}>
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
    </span>
  );
};

UserKeywordItem.propTypes = {
  keyword: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UserKeywordItem;
