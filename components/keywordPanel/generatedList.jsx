import React from 'react';
import PropTypes from 'prop-types';
import KeywordItem from './keywordItem';
import styles from './keywordPanel.scss';

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
    <ul className={styles.flexList}>
      {Object.keys(keywordItems).map((key) => (
        <li key={keywordItems[key].id}>
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
