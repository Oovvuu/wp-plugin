import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import theme from 'shared/theme.scss';
import KeywordSelector from './keywordSelector';
import styles from './keywordPanel.scss';

const KeywordPanel = (props) => {
  const {
    keywords, onFetchKeywords, onFetchVideos, onSetKeywords,
  } = props;

  return (
    <div className={classnames(styles.panel, theme.panel)}>
      <h3>{__('Recommended Keywords', 'oovvuu')}</h3>
      <KeywordSelector
        keywords={keywords}
        onKeywordsUpdated={(updated) => onSetKeywords(updated)}
      />
      <div>
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
      </div>
    </div>
  );
};

KeywordPanel.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFetchKeywords: PropTypes.func.isRequired,
  onFetchVideos: PropTypes.func.isRequired,
  onSetKeywords: PropTypes.func.isRequired,
};

export default KeywordPanel;
