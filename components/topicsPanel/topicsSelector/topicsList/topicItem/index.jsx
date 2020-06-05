import React from 'react';
import PropTypes from 'prop-types';
import keywords from 'components/keywordPanel/keywords.scss';

/**
 * Component for a single pill for selecting and deselecting a topic.
 */
const TopicItem = (props) => {
  const {
    item,
  } = props;

  const key = `topic-${item.filter.keywordMatch[0]}`;

  return (
    <label
      className={keywords.recommended}
      htmlFor={key}
    >
      <input
        id={key}
        name={item.filter.keywordMatch[0]}
        type="checkbox"
      />
      <span>
        <img src={item.previewImage.url} alt="" />
        {item.filter.keywordMatch[0]}
        {item.approximateTotalCount}
      </span>
    </label>
  );
};

TopicItem.propTypes = {
  item: PropTypes.shape({
    approximateTotalCount: PropTypes.number,
    filter: PropTypes.objectOf(PropTypes.shape({
      keywordMatch: PropTypes.array,
      genre: PropTypes.array,
      publishedAt: PropTypes.object,
    })),
    previewImage: PropTypes.objectOf(PropTypes.shape({
      url: PropTypes.string,
    })),
  }).isRequired,
};

export default TopicItem;
