import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import ActionButton from 'components/shared/actionButton';
import { confirmThenProceed } from 'services/alert';
import ClearIcon from 'assets/clear.svg';
import VideoCardWrapper from 'components/shared/videoCard';
import formatDuration from 'services/formatDuration';
import styles from './dialogVideoCard.scss';

/**
 * Displays an individual video with an position.
 */
const DialogVideoCard = (props) => {
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

  /**
   * Get the classnames for the current video card.
   *
   * @param {Boolean} dropTarget Whether or not this is a drop target element.
   * @return {string} The classnames string.
   */
  const getClassnames = (dropTarget) => classNames(
    styles.wrapper,
    { [styles.isDropTarget]: dropTarget },
  );

  const [videoClassnames, setVideoClassnames] = React.useState(getClassnames(false));

  const videoCardRef = React.useRef();

  /**
   * Removes a video from the position.
   */
  const removeVideo = () => {
    confirmThenProceed(
      { message: __('Are you sure you want to remove this video?', 'oovvuu') },
      __('Yes, remove it', 'oovvuu'),
      () => {
        dispatch({
          type: 'REMOVE_VIDEO',
          payload: {
            position: positionKey,
            videoId: id,
          },
        });
      },
    );
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
   * Styles the drag over valid target element.
   *
   * @param {Event} event The drop event.
   */
  const handleDragEnter = (event) => {
    event.preventDefault();

    if (videoCardRef.current.firstChild.contains(event.target)) {
      setVideoClassnames(getClassnames(true));
    }
  };

  /**
   * Removes valid drop target styling.
   *
   * @param {Event} event The drop event.
   */
  const handleDragLeave = (event) => {
    event.preventDefault();

    const rect = videoCardRef.current.getBoundingClientRect();

    const withinEl = (
      event.clientX >= rect.left
      && event.clientY >= rect.top
      && event.clientX <= rect.right
      && event.clientY <= rect.bottom
    );

    // Dragged outside the element.
    if (!withinEl) {
      setVideoClassnames(getClassnames(false));
    }
  };

  /**
   * Handle the drag start event to get the relevant video data from the source
   * video.
   *
   * @param {Event} event The drag start event.
   */
  const handleDragStart = (event) => {
    // Create a ghost element used as the drag image.
    const clonedNode = event.target.cloneNode(true);
    clonedNode.firstChild.style.backgroundColor = 'white';
    clonedNode.style.width = `${event.target.offsetWidth}px`;
    clonedNode.style.position = 'absolute';
    clonedNode.style.top = '0';
    clonedNode.style.left = '0';
    clonedNode.style.zIndex = '-1';
    clonedNode.firstChild.style.border = 'solid 1px var(--oovvuu-color-theme)';

    // Set the rotation.
    clonedNode.firstChild.style.transform = 'rotate(2deg)';

    event.target.parentNode.appendChild(clonedNode);
    event.dataTransfer.setDragImage(clonedNode, 20, 20);

    // Set the dragging video in the global state.
    const currentVideo = getDragAndDropData();
    dispatch({ type: 'SET_DRAGGING_VIDEO', payload: { ...JSON.parse(currentVideo) } });

    // Add the current dragging video as transfer data in the drag event.
    event.dataTransfer.setData('text', currentVideo);
    event.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign
    event.dataTransfer.effectAllowed = 'move'; // eslint-disable-line no-param-reassign

    // Remove the ghost element.
    window.setTimeout(() => {
      clonedNode.parentNode.removeChild(clonedNode);
    }, 1000);
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
    setVideoClassnames(getClassnames(false));
  }, [currentDraggingVideo]);

  return (
    <div
      key={id}
      className={videoClassnames}
      ref={videoCardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDragOver={allowDrop}
      onDrop={handleDrop}
    >
      <div className={styles.inner}>
        <ActionButton
          buttonStyle="icon"
          className={styles.removeVideo}
          onClickHandler={removeVideo}
        >
          <ClearIcon />
        </ActionButton>
        <VideoCardWrapper
          summary={summary}
          clipLength={formatDuration(duration)}
          modified={modified}
          title={title}
          url={url}
          legalName={legalName}
          size="large"
        />
      </div>
    </div>
  );
};

DialogVideoCard.propTypes = {
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

export default DialogVideoCard;
