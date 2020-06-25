import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from 'components/shared/actionButton';
import BrightcovePlayer from 'components/shared/brightcovePlayer';
import VideoCardWrapper from 'components/shared/videoCard';
import formatDuration from 'services/formatDuration';
import OovvuuDataContext from 'components/app/context';
import AddIcon from 'assets/add.svg';
import DoneIcon from 'assets/done.svg';
import styles from './latestVideoItem.scss';

/**
 * The latest video list item container.
 */
const LatestVideoItemWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const {
    state: {
      lastActionType,
      sidebarSelectedHeroVideo,
    },
    dispatch,
  } = React.useContext(OovvuuDataContext);

  const {
    video,
    video: {
      collection: {
        provider: {
          logo: {
            url,
          },
          legalName,
        },
      },
      preview,
      duration,
      id,
      modified,
      title,
    },
    isRemovingVideo,
    isAddingVideo,
    updateIsAddingVideo,
  } = props;

  /**
   * Render image thumbnail or brightcove player.
   */
  const renderPlayer = () => {
    if (preview === null) {
      return (
        <img src={video?.thumbnail?.url} alt="" />
      );
    }
    return (
      <BrightcovePlayer
        accountId={preview.brightcoveAccountId}
        playerId={preview.brightcovePlayerId}
        videoId={preview.brightcoveVideoId}
      />
    );
  };

  /**
   * Handles adding a story from the sidebar as the hero embed for a post.
   */
  const handleAddToStory = async () => {
    // Set loading state.
    updateIsAddingVideo(true);

    // Set the sidebar hero embed.
    dispatch({ type: 'UPDATE_SIDEBAR_HERO_EMBED', payload: video });
  };

  /**
   * Determine if the current video is already added as the hero embed video.
   *
   * @return {boolean} True if there is a video embedded via the sidebar,
   *                   otherwise false.
   */
  const isVideoAdded = () => (sidebarSelectedHeroVideo.id === id);

  /**
   * Get the button text for the add to story based on whether this video is already
   * added as the hero.
   *
   * @return {string} The button text.
   */
  const ButtonContents = () => {
    if (isAddingVideo && isVideoAdded()) {
      return <>{__('Adding...', 'oovvuu')}</>;
    }

    return isVideoAdded()
      ? (
        <>
          <DoneIcon />
          {__('Added', 'oovvuu')}
        </>
      )
      : (
        <>
          <AddIcon />
          {__('Add to story', 'oovvuu')}
        </>
      );
  };

  /**
   * Clear the loading state after the state has been reset.
   */
  React.useEffect(() => {
    if (lastActionType === 'RESET_STATE') {
      updateIsAddingVideo(false);
    }
  }, [lastActionType]);

  return (
    <li
      key={id}
    >
      <div className={styles.wrapper}>
        {renderPlayer()}
        <div className={styles.inner}>
          <VideoCardWrapper
            clipLength={formatDuration(duration)}
            modified={modified}
            title={title}
            url={url}
            legalName={legalName}
            size="small"
          />
          <ActionButton
            disabled={isVideoAdded() || isRemovingVideo || isAddingVideo}
            buttonStyle="small"
            onClickHandler={handleAddToStory}
            className={styles.addButton}
          >
            <ButtonContents />
          </ActionButton>
        </div>
      </div>
    </li>
  );
};

LatestVideoItemWrapper.propTypes = {
  video: PropTypes.shape({
    collection: PropTypes.shape({
      provider: PropTypes.shape({
        logo: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
        legalName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    preview: PropTypes.shape({
      brightcoveVideoId: PropTypes.string,
      brightcovePlayerId: PropTypes.string,
      brightcoveAccountId: PropTypes.string,
    }),
    thumbnail: PropTypes.shape({
      url: PropTypes.string,
    }),
    duration: PropTypes.number.isRequired,
    modified: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isRemovingVideo: PropTypes.bool.isRequired,
  isAddingVideo: PropTypes.bool.isRequired,
  updateIsAddingVideo: PropTypes.func.isRequired,
};

export default LatestVideoItemWrapper;
