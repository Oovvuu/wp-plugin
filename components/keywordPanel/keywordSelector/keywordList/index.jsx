import React from 'react';
import PropTypes from 'prop-types';
import theme from 'shared/theme.scss';
import KeywordItem from './keywordItem';

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
  const {
    keywordItems, onRemove, onUpdate,
  } = props;

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
    <ul className={theme.termList}>
      {Object.keys(keywordItems).map((key) => (
        <li key={keywordItems[key].keyword}>
          <KeywordItem
            item={keywordItems[key]}
            onRemove={onRemove}
            onToggle={handleToggle}
            onUpdate={onUpdate}
          />
        </li>
      ))}
    </ul>
  );
};

KeywordList.defaultProps = { onRemove: null };

KeywordList.propTypes = {
  keywordItems: PropTypes.objectOf(PropTypes.shape({
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  })).isRequired,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
};

export default KeywordList;
