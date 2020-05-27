import React from 'react';
import oovvuuData from 'components/app/context';
import KeywordList from './keywordList';
import UserKeywordList from './userKeywordList';
import styles from '../keywordPanel.scss';

/**
 * Container component aggregating keyword selections from both the generated list
 *   and the user-supplied list. Handles merging of lists into a master list
 *   of all selected keywords.
 */
const KeywordSelector = () => {
  const { i18n: { __ } } = wp;

  const {
    dispatch,
    state: { recommendedKeywords, selectedKeywords },
  } = React.useContext(oovvuuData);

  /**
   * Locally track all selected keywords.
   */
  const [keywordItems, setKeywordItems] = React.useState({});

  /**
   * Handles sync of all keyword item state on update. This is different
   *   than an addition or removal of a keyword item, which is handled by
   *   handleMutate().
   *   - User keyword items require extra handling as they
   *     must be maintained even when the generated recommendedKeywords list
   *     is refreshed.
   *   - Keyword item objects should have the following shape:
   *     - isSelected: boolean
   *     - keyword: string
   *     - type: string Token to indicate keyword item type,
   *         one of 'generated' or 'user'.
   *
   * @param item object Update keyword item.
   */
  const handleItemUpdated = (item) => {
    const { keyword, isSelected } = item;

    // Add to selected if it's not a duplicate.
    const maybeAddToSelected = () => {
      if (!selectedKeywords.includes(keyword)) {
        return [...selectedKeywords, keyword.toLowerCase()];
      }

      return [...selectedKeywords];
    };

    const updatedCurrentKeywords = isSelected
      ? maybeAddToSelected()
      : selectedKeywords.filter((selected) => selected !== keyword);

    dispatch({ payload: updatedCurrentKeywords, type: 'UPDATE_SELECTED_KEYWORDS' });
  };

  /**
   * Side effect to compile the master index of all keyword items, used for tracking
   *   state throughout the selector tree.
   *
   * @param  {Array} selectionList An array list of the currently selected keyword strings.
   */
  const compileAllKeywordItems = (selectionList) => {
    const indexedKeywords = recommendedKeywords.reduce((carry, keyword) => ({
      ...carry,
      ...{
        [keyword]: {
          isSelected: selectionList.includes(keyword), keyword, type: 'generated',
        },
      },
    }), {});

    setKeywordItems({ ...indexedKeywords });
  };

  /**
   * Builds the allKeywordItems list, with unique ID, selection state and item type,
   *   when the recommendedKeywords prop changes.
   */
  React.useEffect(() => {
    if (recommendedKeywords.length) {
      compileAllKeywordItems(selectedKeywords);
    }
  }, [recommendedKeywords]);

  return (
    <div className={styles.selector}>
      <h4>{__('Select all relevant keywords', 'oovvuu')}</h4>
      <KeywordList
        keywordItems={keywordItems}
        onUpdate={handleItemUpdated}
      />
      <h4>{__('Add additional keywords here', 'oovvuu')}</h4>
      <UserKeywordList />
    </div>
  );
};

export default KeywordSelector;
