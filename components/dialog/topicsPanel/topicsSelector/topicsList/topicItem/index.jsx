import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
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

  const keywordId = `topic-${keywordMatch.replace(/[\W\s]+/g, '-')}`;
  const buttonId = `${keywordId}-button`;
  const countId = `${keywordId}-count`;

  return (
    <button
      type="submit"
      className={classnames(theme.topic, { [theme.topicSelected]: isSelected })}
      onClick={() => onToggle(item)}
      id={buttonId}
      aria-label={__('Recommend videos for', 'oovvuu')}
      aria-labelledby={`${buttonId} ${keywordId} ${countId}`}
      aria-pressed={isSelected}
    >
      <div>
        <img src={url} alt="" />
        <span id={keywordId}>
          {keywordMatch}
        </span>
        <span
          id={countId}
          aria-label={`with approximately ${approximateTotalCount} videos available`}
        >
          {approximateTotalCount}
        </span>
      </div>
    </button>
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
