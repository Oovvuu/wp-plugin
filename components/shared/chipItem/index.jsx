import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CloseIcon from 'assets/close.svg';
import styles from './chipItem.scss';

/**
 * Component for a single pill for presenting a user-defined keyword.
 */
const ChipItem = (props) => {
  const { i18n: { __ } } = wp;
  const {
    keyword,
    handleRemove,
  } = props;

  const textId = keyword.replace(/\s/g, '-');
  const buttonId = `remove-${textId}`;

  return (
    <div
      className={classnames(styles.item, styles.user)}
    >
      <span
        id={textId}
        aria-hidden="true"
      >
        {keyword}
      </span>

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
  );
};

ChipItem.propTypes = {
  keyword: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default ChipItem;
