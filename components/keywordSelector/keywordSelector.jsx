import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import uuid from 'react-uuid';
import GeneratedList from './generatedList';
import UserList from './userList';

const KeywordSelector = (props) => {
  const { keywords } = props;
  const [generatedItems, setGeneratedItems] = React.useState({});
  const [userItems, setUserItems] = React.useState({});
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = React.useState([]);

  const handleAddUser = (keyword) => {
    setUserItems({ ...userItems, ...{ id: uuid(), keyword } });
  };

  const handleRemoveUser = (id) => {
    setUserItems(Object.keys(userItems).filter((userItem) => userItem.id !== id));
  };

  // eslint-disable-next-line no-unused-vars
  const handleUpdateGenerated = (id) => {
    // TODO.
  };

  React.useEffect(() => {
    const indexedKeywords = keywords.reduce((carry, keyword) => {
      const id = uuid();
      return {
        ...carry,
        ...{ [id]: { id, isSelected: false, keyword } },
      };
    }, {});
    setGeneratedItems(indexedKeywords);
  }, [keywords]);

  return (
    <>
      <h4>{__('Select all relevant keywords', 'oovvuu')}</h4>
      <GeneratedList keywordItems={generatedItems} onUpdate={handleUpdateGenerated} />
      <h4>{__('Add additional keywords here', 'oovvuu')}</h4>
      <UserList
        keywordItems={userItems}
        onAdd={(keyword) => handleAddUser(keyword)}
        onRemove={(keyword) => handleRemoveUser(keyword)}
      />
    </>
  );
};

KeywordSelector.propTypes = { keywords: PropTypes.arrayOf(PropTypes.string).isRequired };

export default KeywordSelector;
