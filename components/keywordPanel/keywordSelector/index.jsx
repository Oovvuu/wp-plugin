import React from 'react';
import uuid from 'react-uuid';
import oovvuuData from 'components/app/context';
import GeneratedList from '../generatedList';
import UserList from '../userList';
import styles from '../keywordPanel.scss';

/**
 * Container component aggregating keyword selections from both the generated list
 *   and the user-supplied list. Handles merging of lists into a master list
 *   of all selected keywords.
 */
const KeywordSelector = () => {
  const { i18n: { __ } } = wp;
  const [allKeywordItems, setAllKeywordItems] = React.useState({});
  const [selectedKeywords, setSelectedKeywords] = React.useState([]);
  const { dispatch, state: { recommendedKeywords } } = React.useContext(oovvuuData);

  /**
   * Need to track these separately so they are not blown away if recommendedKeywords
   *   (string list fetched via API) is refreshed.
   */
  const [userKeywordItems, setUserKeywordItems] = React.useState({});

  /**
   * Handles sync of all state when a keyword item is updated.
   *   - User keyword items require extra handling as they
   *     must be maintained even when the generated recommendedKeywords list
   *     is refreshed.
   *   - Keyword item objects should have the following shape:
   *     - id: string (UUID)
   *     - isSelected: boolean
   *     - keyword: string
   *     - type: string Token to indicate keyword item type,
   *         one of 'generated' or 'user'.
   *
   * @param item object Update keyword item.
   */
  const handleItemUpdated = (item) => {
    const {
      id, isSelected, keyword, type,
    } = item;
    const updatedAllKeywordItems = { ...allKeywordItems, ...{ [id]: item } };
    const updatedSelectedKeywords = isSelected
      ? [...selectedKeywords, keyword]
      : selectedKeywords.filter((selected) => selected !== keyword);
    setAllKeywordItems(updatedAllKeywordItems);
    setSelectedKeywords(updatedSelectedKeywords);
    dispatch({ payload: updatedSelectedKeywords, type: 'UPDATE_SELECTED_KEYWORDS' });

    // TODO: Refine on build-out of UserList component (OVU-9).
    if (type === 'user') {
      const updatedUserKeywordItems = isSelected
        ? { ...userKeywordItems, ...{ [id]: item } }
        : { ...userKeywordItems, ...{ [id]: undefined } };
      setUserKeywordItems(updatedUserKeywordItems);
    }
  };

  /**
   * Compiles a keyword item list for a given type.
   *
   * @param type string Token to indicate keyword item type,
   *          one of 'generated' or 'user'.
   * @returns object List of keyword items keyed by string UUID.
   */
  const itemsFor = (type) => Object.keys(allKeywordItems)
    .reduce((carry, id) => {
      if (allKeywordItems[id].type === type) {
        return { ...carry, ...{ [id]: allKeywordItems[id] } };
      }

      return carry;
    }, {});

  /**
   * Builds the allKeywordItems list, with unique ID, selection state and item type,
   *   when the recommendedKeywords prop changes.
   */
  React.useEffect(() => {
    if (recommendedKeywords.length) {
      const indexedKeywords = recommendedKeywords.reduce((carry, keyword) => {
        const id = uuid();
        return {
          ...carry,
          ...{
            [id]: {
              id, isSelected: false, keyword, type: 'generated',
            },
          },
        };
      }, {});
      // Merge in userKeywordItems so they are not blown away on recommendedKeywords update.
      const updatedAllKeywordItems = { ...indexedKeywords, ...userKeywordItems };
      setAllKeywordItems(updatedAllKeywordItems);
    }
  }, [recommendedKeywords]);

  return (
    <div className={styles.selector}>
      <h4>{__('Select all relevant keywords', 'oovvuu')}</h4>
      <GeneratedList
        keywordItems={itemsFor('generated')}
        onUpdate={handleItemUpdated}
      />
      <h4>{__('Add additional keywords here', 'oovvuu')}</h4>
      <UserList keywordItems={itemsFor('user')} onUpdate={handleItemUpdated} />
    </div>
  );
};

export default KeywordSelector;