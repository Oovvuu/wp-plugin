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
  const { video: { id } } = props;
  const { dispatch } = React.useContext(OovvuuDataContext);

  return (
    <div>
      <h3>{__('Current Hero Position Video', 'oovvuu')}</h3>
      {id}
      <ActionButton
        buttonStyle="icon"
        className={styles.remove}
        onClickHandler={() => dispatch({ type: 'REMOVE_SIDEBAR_SELECTED_HERO' })}
      >
        <ClearIcon />
      </ActionButton>
    </div>
  );
};

HeroCardWrapper.propTypes = {
  video: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
};

export default HeroCardWrapper;
