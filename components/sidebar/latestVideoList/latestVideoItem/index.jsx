import React from 'react';
import PropTypes from 'prop-types';
import BrightcovePlayer from 'components/shared/brightcovePlayer';
import truncate from 'truncate';

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
      summary,
      id,
      title,
    },
  } = props;

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
        <div>
          <img src={url} alt={legalName} />
        </div>
        <h4>{title}</h4>
        <p>{truncate(summary, 272)}</p>
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
