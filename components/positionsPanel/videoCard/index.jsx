import React from 'react';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import ActionButton from 'components/actionButton';
import CloseIcon from 'assets/close.svg';

/**
 * Displays an individual video with an position.
 */
const VideoCardWrapper = (props) => {
  const { i18n: { __ } } = wp;
  const { positionKey, video: { id, title } } = props;
  const {
    dispatch,
  } = React.useContext(OovvuuDataContext);

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

  return (
    <div>
      <p>{title}</p>
      <ActionButton
        buttonStyle="collapse"
        onClickHandler={removeVideo}
      >
        <CloseIcon />
      </ActionButton>
    </div>
  );
};

VideoCardWrapper.propTypes = {
  positionKey: PropTypes.string.isRequired,
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCardWrapper;
