import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import theme from 'shared/theme.scss';
import TopicItem from './topicItem';
import styles from './topicList.scss';

/**
 * The topics list that shows the user what topics are available to select.
 */
const TopicsList = (props) => {
  const { items } = props;

  return (
    <ul className={classnames(theme.termList, styles.topicList)}>
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
    approximateTotalCount: PropTypes.string.isRequired,
    keywordMatch: PropTypes.string.isRequired,
    previewImage: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
  })).isRequired,
};

export default TopicsList;
