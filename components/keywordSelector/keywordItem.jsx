import React from 'react';
import PropTypes from 'prop-types';

const KeywordItem = (props) => {
  const { item, onToggle } = props;

  return <button onClick={() => onToggle(item.id)} type="button">{item.keyword}</button>;
};

KeywordItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default KeywordItem;
