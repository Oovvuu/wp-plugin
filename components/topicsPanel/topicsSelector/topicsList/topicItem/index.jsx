import React from 'react';
import PropTypes from 'prop-types';
import theme from 'shared/theme.scss';

/**
 * Component for a single pill for selecting and deselecting a topic.
 */
const TopicItem = (props) => {
  const {
    item: {
      approximateTotalCount,
      keywordMatch,
      previewImage: { url },
    },
  } = props;

  const key = `topic-${keywordMatch}`;

  return (
    <label
      className={theme.recommendedTerm}
      htmlFor={key}
    >
      <input
        id={key}
        name={keywordMatch}
        type="checkbox"
      />
      <span>
        <img src={url} alt="" />
        {keywordMatch}
        {approximateTotalCount}
      </span>
    </label>
  );
};

TopicItem.propTypes = {
  item: PropTypes.shape({
    approximateTotalCount: PropTypes.number.isRequired,
    keywordMatch: PropTypes.string.isRequired,
    previewImage: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default TopicItem;
