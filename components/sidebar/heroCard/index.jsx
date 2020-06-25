import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from 'assets/clear.svg';
import OovvuuDataContext from 'components/app/context';
import ActionButton from 'components/shared/actionButton';
import { confirmThenProceed } from 'services/alert';
import styles from './heroCard.scss';

/**
 * Wrapper for selected hero video for use in sidebar.
 */
const HeroCardWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const {
    video,
    video: {
      title,
    },
    isRemovingVideo,
    updateIsRemovingVideo,
  } = props;
  const {
    state: {
      lastActionType,
    },
    dispatch,
  } = React.useContext(OovvuuDataContext);

  /**
   * Handles removing a sidebar hero video.
   */
  const handleRemoveVideo = () => {
    confirmThenProceed(
      { message: __('Are you sure you want to remove the hero embed?', 'oovvuu') },
      __('Yes, remove', 'oovvuu'),
      () => {
        updateIsRemovingVideo(true);
        dispatch({ type: 'REMOVE_SIDEBAR_SELECTED_HERO' });
      },
    );
  };

  /**
   * Clear the loading state after the state has been reset from video removal.
   */
  React.useEffect(() => {
    if (lastActionType === 'RESET_STATE') {
      updateIsRemovingVideo(false);
    }
  }, [lastActionType]);

  return (
    <div className={styles.card}>
      {!isRemovingVideo ? (
        <>
          <div className={styles.header}>
            <h3>{__('Current Hero Position Video', 'oovvuu')}</h3>
            <ActionButton
              buttonStyle="icon"
              className={styles.remove}
              onClickHandler={handleRemoveVideo}
            >
              <ClearIcon />
            </ActionButton>
          </div>
          <div className={styles.content}>
            {video?.thumbnail?.url && <img src={video.thumbnail.url} alt="" />}
            <p>{title}</p>
          </div>
        </>
      ) : (__('Removing video...', 'oovvuu'))}
    </div>
  );
};

HeroCardWrapper.defaultProps = {
  video: {},
};

HeroCardWrapper.propTypes = {
  video: PropTypes.shape({
    thumbnail: PropTypes.shape({ url: PropTypes.string }),
    title: PropTypes.string,
  }),
  isRemovingVideo: PropTypes.bool.isRequired,
  updateIsRemovingVideo: PropTypes.func.isRequired,
};

export default HeroCardWrapper;
