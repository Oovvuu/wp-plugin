import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import KeywordSelector from './keywordSelector';

const KeywordPanel = (props) => {
  const {
    keywords, onFetchKeywords, onFetchVideos, onSetKeywords,
  } = props;

  return (
    <>
      <h3>{__('Recommended Keywords', 'oovvuu')}</h3>
      <KeywordSelector
        keywords={keywords}
        onKeywordsUpdated={(updated) => onSetKeywords(updated)}
      />
      <p>
        <button
          type="button"
          onClick={onFetchKeywords}
        >
          {__('Get new Keywords', 'oovvuu')}
        </button>
        <button
          type="button"
          onClick={onFetchVideos}
        >
          {__('Fetch Videos', 'oovvuu')}
        </button>
      </p>
    </>
  );
};

KeywordPanel.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFetchKeywords: PropTypes.func.isRequired,
  onFetchVideos: PropTypes.func.isRequired,
  onSetKeywords: PropTypes.func.isRequired,
};

export default KeywordPanel;
