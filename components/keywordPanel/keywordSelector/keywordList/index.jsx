import React from 'react';
import PropTypes from 'prop-types';
import oovvuuData from 'components/app/context';
import styles from './keywordList.scss';
import KeywordItem from './keywordItem';

/**
 * Displays and manages the list of recommended keywords.
 */
const KeywordList = (props) => {
  const {
    dispatch,
    state: { selectedKeywords },
  } = React.useContext(oovvuuData);
  const {
    keywordItems,
  } = props;

  /**
   * Handle toggling recommended keywords.
   *
   * @param {string} keyword the keyword being updated.
   */
  const handleItemUpdated = (keyword) => {
    const payload = (!selectedKeywords.includes(keyword))
      ? [...selectedKeywords, keyword.toLowerCase()]
      : selectedKeywords.filter((selected) => selected !== keyword);

    dispatch({ payload, type: 'UPDATE_SELECTED_KEYWORDS' });
  };

  return (
    <ul className={styles.keywords}>
      {keywordItems.map((keyword) => (
        <li key={keyword}>
          <KeywordItem
            keyword={keyword}
            isSelected={selectedKeywords.includes(keyword)}
            onToggle={handleItemUpdated}
          />
        </li>
      ))}
    </ul>
  );
};

KeywordList.propTypes = {
  keywordItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default KeywordList;
