import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import oovvuuDataContext from 'components/app/context';
import theme from 'shared/theme.scss';
import TopicItem from './topicItem';
import styles from './topicList.scss';

/**
 * The topics list that shows the user what topics are available to select.
 */
const TopicsList = (props) => {
  const { items } = props;
  const { dispatch, state: { selectedTopics } } = React.useContext(oovvuuDataContext);
  const [localSelectedTopics, setLocalSelectedTopics] = React.useState([...selectedTopics]);

  /**
   * Triggers a new search given the selected topic.
   *
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  const handleClick = (item) => {
    // Clear all selections.
    dispatch({ type: 'CLEAR_SELECTED_TOPICS' });

    // Select the topic and trigger a search.
    dispatch({ type: 'UPDATE_SELECTED_TOPICS', payload: [item] });
  };

  /**
   * Determines if a topic is selected.
   *
   * @param  {string}  keyword The keyword to match.
   * @return {Boolean}         True or false.
   */
  const isSelected = (keyword) => {
    const filteredTopics = localSelectedTopics.filter((topic) => topic.keywordMatch === keyword);

    return filteredTopics.length !== 0;
  };

  React.useEffect(() => {
    setLocalSelectedTopics([...selectedTopics]);
  }, [selectedTopics]);

  return (
    <ul className={classnames(theme.termList, styles.topicList)}>
      {items.map((item) => {
        const { keywordMatch } = item;

        return (
          <li key={`topic-${keywordMatch}`}>
            <TopicItem
              isSelected={isSelected(keywordMatch)}
              item={item}
              onToggle={handleClick}
            />
          </li>
        );
      })}
    </ul>
  );
};

TopicsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    keywordMatch: PropTypes.string.isRequired,
  })).isRequired,
};

export default TopicsList;
