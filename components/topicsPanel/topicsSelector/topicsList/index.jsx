import React from 'react';
import PropTypes from 'prop-types';
import theme from 'shared/theme.scss';
import TopicItem from './topicItem';

/**
 * The topics list that shows the user what topics are available to select.
 */
const TopicsList = (props) => {
  const { items } = props;

  return (
    <ul className={theme.termList}>
      {items.map((item) => {
        const { keywordMatch } = item;

        return (
          <li key={`topic-${keywordMatch}`}>
            <TopicItem item={item} />
          </li>
        );
      })}
    </ul>
  );
};

TopicsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    approximateTotalCount: PropTypes.number.isRequired,
    keywordMatch: PropTypes.string.isRequired,
    previewImage: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  })).isRequired,
};

export default TopicsList;
