import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from 'assets/clear.svg';
import OovvuuDataContext from 'components/app/context';
import ActionButton from 'components/shared/actionButton';
import styles from './heroCard.scss';

/**
 * Wrapper for selected hero video for use in sidebar.
 */
const HeroCardWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const { video: { thumbnail: { url }, title } } = props;
  const { dispatch } = React.useContext(OovvuuDataContext);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{__('Current Hero Position Video', 'oovvuu')}</h3>
        <ActionButton
          buttonStyle="icon"
          className={styles.remove}
          onClickHandler={() => dispatch({ type: 'REMOVE_SIDEBAR_SELECTED_HERO' })}
        >
          <ClearIcon />
        </ActionButton>
      </div>
      <div className={styles.content}>
        <img src={url} alt="video thumbnail" />
        <p>{title}</p>
      </div>
    </div>
  );
};

HeroCardWrapper.propTypes = {
  video: PropTypes.shape({
    thumbnail: PropTypes.shape({ url: PropTypes.string.isRequired }),
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default HeroCardWrapper;
