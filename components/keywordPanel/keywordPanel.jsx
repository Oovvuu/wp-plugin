import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import oovvuuData from 'components/app/oovvuuDataContext';
import getKeywords from 'services/getKeywords';
import getVideos from 'services/getVideos';
import getPostAttribute from 'services/getPostAttribute';
import theme from 'shared/theme.scss';
import KeywordSelector from './keywordSelector';
import styles from './keywordPanel.scss';

const KeywordPanel = (props) => {
  const { onSetKeywords } = props;
  const {
    dispatch,
    state: { recommendedKeywords, selectedKeywords },
  } = React.useContext(oovvuuData);
  const id = getPostAttribute('id');

  /**
   * onClick handler for the "Get new Keywords" button. Calls the getKeywords
   *   service with details on the current post. On successful response,
   *   dispatches an update to application state to set the recommendedKeywords
   *   from the Oovvuu API.
   *
   * @returns {Promise<void>} Future for response data or error object.
   */
  const handleFetchKeywords = async () => {
    const title = getPostAttribute('title');
    const content = getPostAttribute('content');

    // TODO: Wrap with start and stop loading spinner.
    const response = await getKeywords(title, content, id);

    if (!response.hasError) {
      const { keywords } = response.data;
      dispatch({ payload: keywords, type: 'UPDATE_RECOMMENDED_KEYWORDS' });
    }
  };


  /**
   * onClick handler for the "Fetch Videos" button. Calls the getVideos
   *   service with selectedKeywords and the current post ID. On successful response,
   *   dispatches an update to application state to set the recommendedVideos
   *   from the Oovvuu API.
   *
   * @returns {Promise<void>} Future for response data or error object.
   */
  const handleFetchVideos = async () => {
    // TODO: Wrap with start and stop loading spinner.
    const response = await getVideos(selectedKeywords, id);

    if (!response.hasError) {
      const { videos } = response.data;
      dispatch({ payload: videos, type: 'UPDATE_RECOMMENDED_VIDEOS' });
    }
  };

  return (
    <div className={classnames(styles.panel, theme.panel)}>
      <h3>{__('Recommended Keywords', 'oovvuu')}</h3>
      <KeywordSelector
        keywords={recommendedKeywords}
        onKeywordsUpdated={(updated) => onSetKeywords(updated)}
      />
      <div>
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
      </div>
    </div>
  );
};

KeywordPanel.propTypes = { onSetKeywords: PropTypes.func.isRequired };

export default KeywordPanel;
