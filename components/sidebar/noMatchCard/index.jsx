import React from 'react';
import WarnIcon from 'assets/warn.svg';
import styles from './noMatchCard.scss';

const NoMatchCard = () => {
  const { i18n: { __ } } = wp;

  return (
    <div className={styles.wrapper}>
      <h3
        className={styles.notice}
      >
        <span>
          <WarnIcon />
          {__("Sorry, we couldn't find a match", 'oovvuu')}
        </span>
      </h3>
      <p className={styles.content}>
        {__('Please change your selected keywords to improve your video recommendations.', 'oovvuu')}
      </p>
    </div>
  );
};

export default NoMatchCard;
