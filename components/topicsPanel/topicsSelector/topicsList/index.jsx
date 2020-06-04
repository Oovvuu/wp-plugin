import React from 'react';
import PropTypes from 'prop-types';
import styles from 'shared/checkboxes.scss';
import TopicItem from './topicItem';

/**
 * The topics list that shows the user what topics are available to select.
 */
const TopicsList = (props) => {
  const {
    items,
  } = props;

  return (
    <ul className={styles.keywords}>
      {Object.keys(items).map((key) => (
        <li className={styles.keyword} key={`topic-${items[key].filter.keywordMatch[0]}`}>
          <TopicItem
            item={items[key]}
          />
        </li>
      ))}
    </ul>
  );
};

TopicsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    approximateTotalCount: PropTypes.number,
    filter: PropTypes.objectOf(PropTypes.shape({
      keywordMatch: PropTypes.array,
      genre: PropTypes.array,
      publishedAt: PropTypes.object,
    })),
    previewImage: PropTypes.string,
  })).isRequired,
};

export default TopicsList;
