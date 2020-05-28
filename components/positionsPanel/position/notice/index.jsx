import React from 'react';
import PropTypes from 'prop-types';
import WarnIcon from 'assets/warn.svg';
import styles from 'shared/notices.scss';

/**
 * Displays the toggle to enable/disable a position.
 */
const Notice = (props) => {
  const { i18n: { __ } } = wp;
  const { content } = props;

  const notice = (content != null && content.length) ? (
    <div className={styles.wrapper}>
      <h3
        className={styles.notice}
      >
        <span>
          <WarnIcon />
          {__('Notice', 'oovvuu')}
        </span>
      </h3>
      <p className={styles.content}>
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
