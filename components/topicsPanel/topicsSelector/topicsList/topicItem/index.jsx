import React from 'react';
import PropTypes from 'prop-types';
import theme from 'shared/theme.scss';

/**
 * Component for a single pill for selecting and deselecting a topic.
 */
const TopicItem = (props) => {
  const {
    isSelected,
    item: {
      approximateTotalCount,
      keywordMatch,
      previewImage: { url },
    },
    item,
    onToggle,
  } = props;

  const key = `topic-${keywordMatch}`;

  return (
    <label
      className={theme.recommendedTerm}
      htmlFor={key}
    >
      <input
        checked={isSelected}
        id={key}
        name={keywordMatch}
        onChange={() => onToggle(item)}
        type="checkbox"
      />
      <span>
        <div className={theme.itemThumbnail}>
          <img src={url} alt={keywordMatch} />
        </div>
        {keywordMatch}
        <div className={theme.itemMeta}>
          {approximateTotalCount}
        </div>
      </span>
    </label>
  );
};

TopicItem.defaultProps = { isSelected: false };

TopicItem.propTypes = {
  isSelected: PropTypes.bool,
  item: PropTypes.shape({
    approximateTotalCount: PropTypes.string.isRequired,
    keywordMatch: PropTypes.string.isRequired,
    previewImage: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TopicItem;
