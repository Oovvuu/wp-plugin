import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import ActionButton from 'components/actionButton';
import ClearIcon from 'assets/clear.svg';
import styles from './videoCard.scss';
import Badge from './badge';

/**
 * Displays an individual video with an position.
 */
const VideoCardWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const {
    positionKey,
    index,
    video: {
      collection: {
        provider: {
          logo: {
            url,
          },
          legalName,
        },
      },
      summary,
      duration,
      modified,
      id,
      title,
    },
  } = props;
  const {
    dispatch,
    state: {
      currentDraggingVideo,
    },
  } = React.useContext(OovvuuDataContext);
  const clipLength = moment(moment.duration(duration, 'seconds').asMilliseconds()).format('mm:ss');

  /**
   * Determine if this video is actively being dragged.
   *
   * @return {Boolean} Whether the current video is being dragged.
   */
  const isDraggingCurrentVideo = () => currentDraggingVideo.videoId !== undefined
        && currentDraggingVideo.videoId === id;

  /**
   * Get the classnames for the current video card.
   *
   * @return {string} The classnames string.
   */
  const getClassnames = () => classNames(
    styles.wrapper,
    styles.addRemoveKeyword,
    { [styles.isDragging]: isDraggingCurrentVideo() },
  );

  const [videoClassnames, setVideoClassnames] = React.useState(getClassnames());

  /**
   * Removes a video from the position.
   */
  const removeVideo = () => {
    const confirmDialog = confirm( // eslint-disable-line no-restricted-globals
      __('Are you sure you want to remove this video?', 'oovvuu'),
    );

    if (confirmDialog === true) {
      dispatch({
        type: 'REMOVE_VIDEO',
        payload: {
          position: positionKey,
          videoId: id,
        },
      });
    }
  };

  /**
   * Creates a JSON object used for the drag and drop event.
   *
   * @return {object} Video data.
   */
  const getDragAndDropData = () => JSON.stringify({ positionKey, index, videoId: id });

  /**
   * Ensure that the default behavior of the drop is ignored in favor of our custom
   * solution.
   *
   * @param {Event} event The drop event.
   */
  const allowDrop = (event) => {
    event.preventDefault();
  };

  /**
   * Handle the drag start event to get the relevant video data from the source
   * video.
   *
   * @param {Event} event The drag start event.
   */
  const handleDragStart = (event) => {
    const currentVideo = getDragAndDropData();

    dispatch({ type: 'SET_DRAGGING_VIDEO', payload: { ...JSON.parse(currentVideo) } });

    event.dataTransfer.setData('text', currentVideo);
  };

  /**
   * Handle the drag drop event on the destination video and perform the swap.
   *
   * @param {Event} event The drag drop event.
   */
  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');

    dispatch({ type: 'SET_DRAGGING_VIDEO', payload: {} });

    // No data found.
    if (!data) {
      return;
    }

    // Invalid data.
    const parsedData = JSON.parse(data);
    if (!parsedData.positionKey || !parsedData.videoId) {
      return;
    }

    // Perform the swap.
    dispatch({
      type: 'SWAP_VIDEOS',
      payload: {
        videoA: parsedData,
        videoB: JSON.parse(getDragAndDropData()),
      },
    });
  };

  /**
   * Drag event has ended.
   *
   * @param {Event} event The drag drop event.
   */
  const handleDragEnd = (event) => {
    event.preventDefault();

    dispatch({ type: 'SET_DRAGGING_VIDEO', payload: {} });
  };

  /**
   * Update classnames when video drag is updated.
   */
  React.useEffect(() => {
    setVideoClassnames(getClassnames());
  }, [currentDraggingVideo]);

  return (
    <div
      key={id}
      className={videoClassnames}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={allowDrop}
      onDrop={handleDrop}
    >
      <ActionButton
        buttonStyle="icon"
        className={styles.removeVideo}
        onClickHandler={removeVideo}
      >
        <ClearIcon />
      </ActionButton>
      <div className={styles.logo}>
        <img src={url} alt={legalName} draggable="false" />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.meta}>
        <Badge text={clipLength} />
        <Badge text={moment(modified).fromNow()} />
        <Badge text={__('XXX Embeds', 'oovvuu')} type="embed" />
      </div>
      <p className={styles.description}>{summary}</p>
    </div>
  );
};

VideoCardWrapper.propTypes = {
  positionKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  video: PropTypes.shape({
    collection: PropTypes.shape({
      provider: PropTypes.shape({
        logo: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }).isRequired,
        legalName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    summary: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    modified: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
