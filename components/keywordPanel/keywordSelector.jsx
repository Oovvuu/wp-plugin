import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import uuid from 'react-uuid';
import GeneratedList from './generatedList';
import UserList from './userList';

const KeywordSelector = (props) => {
  const { keywords, onKeywordsUpdated } = props;
  const [allKeywordItems, setAllKeywordItems] = React.useState({});
  const [selectedKeywords, setSelectedKeywords] = React.useState([]);

  /**
   * Need to track these separately so they are not blown away if keywords
   *   (string list fetched via API) is refreshed.
   */
  const [userKeywordItems, setUserKeywordItems] = React.useState({});

  /**
   * Handles sync of all state when a keyword item is updated.
   *   - User keyword items require extra handling as they
   *     must be maintained even when the generated keywords list
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
    onKeywordsUpdated(updatedSelectedKeywords);

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
   *   when the keywords prop changes.
   */
  React.useEffect(() => {
    if (keywords.length) {
      const indexedKeywords = keywords.reduce((carry, keyword) => {
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
      // Merge in userKeywordItems, if any, so they are not blown away on keywords update.
      const updatedAllKeywordItems = { ...indexedKeywords, ...userKeywordItems };
      setAllKeywordItems(updatedAllKeywordItems);
    }
  }, [keywords]);

  return (
    <>
      <h4>{__('Select all relevant keywords', 'oovvuu')}</h4>
      <GeneratedList
        keywordItems={itemsFor('generated')}
        onUpdate={handleItemUpdated}
      />
      <h4>{__('Add additional keywords here', 'oovvuu')}</h4>
      <UserList keywordItems={itemsFor('user')} onUpdate={handleItemUpdated} />
    </>
  );
};

KeywordSelector.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  onKeywordsUpdated: PropTypes.func.isRequired,
};

export default KeywordSelector;
