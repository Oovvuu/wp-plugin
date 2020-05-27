import React from 'react';
import PropTypes from 'prop-types';
import WarnIcon from 'assets/warn.svg';
import styles from 'shared/notices.scss';
import ActionButton from '../../../actionButton';

/**
 * Displays the toggle to enable/disable a position.
 */
const Notice = (props) => {
  const { i18n: { __ } } = wp;
  const { content } = props;

  const notice = (content != null && content.length) ? (
    <div className={styles.notice}>
      <ActionButton
        buttonStyle="alert"
        className={styles.notice}
      >
        <WarnIcon />
        {__('Notice', 'oovvuu')}
      </ActionButton>

      <p>
        {content}
      </p>
    </div>
  ) : '';

  return notice;
};

Notice.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Notice;
