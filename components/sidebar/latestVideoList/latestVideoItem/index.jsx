import React from 'react';
import PropTypes from 'prop-types';
import BrightcovePlayer from 'components/shared/brightcovePlayer';
import moment from 'moment';
import VideoCardWrapper from '../../../shared/videoCard';

/**
 * The latest video list item container.
 *
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
      summary,
      duration,
      id,
      modified,
      title,
    },
  } = props;

  const clipLength = moment(moment.duration(duration, 'seconds').asMilliseconds()).format('mm:ss');

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
    <div
      key={id}
    >
      <div>
        {renderPlayer()}
        <VideoCardWrapper
          summary={summary}
          clipLength={clipLength}
          modified={modified}
          title={title}
          url={url}
          legalName={legalName}
        />
      </div>
    </div>
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
    summary: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    modified: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestVideoItemWrapper;
