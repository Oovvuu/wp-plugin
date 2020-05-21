import React from 'react';
import PropTypes from 'prop-types';
import styles from 'shared/checkboxes.scss';
import KeywordItem from '../keywordItem';

/**
 * Component for showing list of keywords for the current post. This has two distinct
 *   behaviors depending on whether the onMutate() callback prop is passed in and further
 *   drilled down to the children KeywordItem components:
 *   - By default (no onMutate() callback), it only renders a KeywordItem with text and a toggle
 *     to show the KeywordItem's selected state.
 *   - With an onMutate() callback, the KeywordItem will additionally render an input
 *     for adding a user-defined keyword. The KeywordItem will also have a ClearIcon to remove
 *     a user-defined keyword.
 */
const KeywordList = (props) => {
  const { keywordItems, onMutate, onUpdate } = props;

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
          <KeywordItem item={keywordItems[key]} onMutate={onMutate} onToggle={handleToggle} />
        </li>
      ))}
    </ul>
  );
};

KeywordList.defaultProps = { onMutate: null };

KeywordList.propTypes = {
  keywordItems: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  })).isRequired,
  onMutate: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
};

export default KeywordList;
