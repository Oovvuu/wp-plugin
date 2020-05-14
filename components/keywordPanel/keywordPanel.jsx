import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import oovvuuData from 'components/app/oovvuuDataContext';
import getKeywords from 'services/getKeywords';
import getVideos from 'services/getVideos';
import getPostAttribute from 'services/getPostAttribute';
import KeywordSelector from './keywordSelector';
import styles from './keywordPanel.scss';

const KeywordPanel = (props) => {
  const { onSetKeywords } = props;
  const {
    dispatch,
    state: { recommendedKeywords, selectedKeywords },
  } = React.useContext(oovvuuData);
  const id = getPostAttribute('id');

  const handleFetchKeywords = async () => {
    const title = getPostAttribute('title');
    const content = getPostAttribute('content');
    const response = await getKeywords(title, content, id);

    if (!response.hasError) {
      const { keywords } = response.data;
      dispatch({ payload: keywords, type: 'UPDATE_RECOMMENDED_KEYWORDS' });
    }
  };

  const handleFetchVideos = async () => {
    const response = await getVideos(selectedKeywords, id);

    if (!response.hasError) {
      const { videos } = response.data;
      dispatch({ payload: videos, type: 'UPDATE_RECOMMENDED_VIDEOS' });
    }
  };

  return (
    <div className={styles.panel}>
      <h3>{__('Recommended Keywords', 'oovvuu')}</h3>
      <KeywordSelector
        keywords={recommendedKeywords}
        onKeywordsUpdated={(updated) => onSetKeywords(updated)}
      />
      <p>
        <button
          type="button"
          onClick={handleFetchKeywords}
        >
          {__('Get new Keywords', 'oovvuu')}
        </button>
        <button
          type="button"
          onClick={handleFetchVideos}
        >
          {__('Fetch Videos', 'oovvuu')}
        </button>
      </p>
    </div>
  );
};

KeywordPanel.propTypes = { onSetKeywords: PropTypes.func.isRequired };

export default KeywordPanel;
