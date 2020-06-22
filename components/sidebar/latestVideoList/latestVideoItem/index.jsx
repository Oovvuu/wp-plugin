import React from 'react';
import PropTypes from 'prop-types';
import BrightcovePlayer from 'components/shared/brightcovePlayer';
import VideoCardWrapper from 'components/shared/videoCard';
import formatDuration from 'services/formatDuration';

/**
 * The latest video list item container.
 */
const LatestVideoItemWrapper = (props) => {
  const {
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
      thumbnail: {
        url: thumbnailUrl,
      } = {},
      duration,
      id,
      modified,
      title,
    },
  } = props;

  /**
   * Render image thumbnail or brightcove player.
   */
  const renderPlayer = () => {
    if (preview === null) {
      return (
        <img src={thumbnailUrl} alt="" />
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

  return (
    <li
      key={id}
    >
      <div>
        {renderPlayer()}
        <VideoCardWrapper
          clipLength={formatDuration(duration)}
          modified={modified}
          title={title}
          url={url}
          legalName={legalName}
        />
        {/* @todo add ADDED button. */}
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
      brightcoveAccountId: PropTypes.string.isRequired,
    }).isRequired,
    thumbnail: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    duration: PropTypes.number.isRequired,
    modified: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestVideoItemWrapper;
