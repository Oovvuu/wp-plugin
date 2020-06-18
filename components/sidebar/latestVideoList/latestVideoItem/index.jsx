import React from 'react';
import PropTypes from 'prop-types';
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
      summary,
      id,
      title,
    },
  } = props;

  return (
    <div
      key={id}
    >
      <div>
        <div>
          <img src={url} alt={legalName} draggable="false" />
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
    summary: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    modified: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestVideoItemWrapper;
