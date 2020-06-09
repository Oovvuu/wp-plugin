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
  const { dispatch, state: { selectedAlternateSearches } } = React.useContext(oovvuuDataContext);
  const [selectedAlternateSearch, setSelectedAlternateSearch] = React.useState(null);

  const handleClick = (item) => {
    const action = selectedAlternateSearch
      ? { type: 'CLEAR_SELECTED_ALTERNATE_SEARCH' }
      : { type: 'SELECT_ALTERNATE_SEARCH', payload: item };
    dispatch(action);
  };

  React.useEffect(() => {
    const [selected] = selectedAlternateSearches;

    setSelectedAlternateSearch(selected ?? null);
  }, [selectedAlternateSearches]);

  return (
    <ul className={classnames(theme.termList, styles.topicList)}>
      {items.map((item) => {
        const { keywordMatch } = item;

        return (
          <li key={`topic-${keywordMatch}`}>
            <TopicItem
              isSelected={keywordMatch === selectedAlternateSearch?.keywordMatch}
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
