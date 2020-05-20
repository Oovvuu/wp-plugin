import React from 'react';
import PropTypes from 'prop-types';
import styles from 'shared/checkboxes.scss';
import KeywordItem from '../keywordItem';

/**
 * Component for showing list of recommendedKeywords for the current post.
 */
const GeneratedList = (props) => {
  const { keywordItems, onUpdate } = props;

  /**
   * Flips selected state of a keyword item and calls update callback.
   *
   * @param key string UUID key of the updated keyword item.
   */
  const handleToggle = (key) => {
    const toggled = keywordItems[key];
    toggled.isSelected = !toggled.isSelected;

    onUpdate(toggled);
  };

  return (
    <ul className={styles.keywords}>
      {Object.keys(keywordItems).map((key) => (
        <li className={styles.keyword} key={keywordItems[key].id}>
          <KeywordItem item={keywordItems[key]} onToggle={handleToggle} />
        </li>
      ))}
    </ul>
  );
};

GeneratedList.propTypes = {
  keywordItems: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  })).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GeneratedList;
