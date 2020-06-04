import React from 'react';
import PropTypes from 'prop-types';
import PlayerWrapper from 'components/positionsPanel/position/player';
import classnames from 'classnames';
import theme from 'shared/theme.scss';
import styles from 'components/positionsPanel/position/position.scss';

/**
 * A React component to render an Oovvuu Embed.
 */
const EmbedEdit = (props) => {
  const {
    attributes: {
      videos = {},
    } = {},
  } = props;

  const getVideosArray = () => JSON.parse(videos);

  return (
    <div className={classnames(
      styles.playerWrapper,
      theme.panel,
      styles.brightcovePlayer,
    )}
    >
      <PlayerWrapper videos={getVideosArray()} />
    </div>
  );
};

// Set up initial props.
EmbedEdit.defaultProps = {
  attributes: {
    videos: '',
  },
};

// Set PropTypes for this component.
EmbedEdit.propTypes = {
  attributes: PropTypes.shape({
    videos: PropTypes.string,
  }),
};

export default EmbedEdit;
