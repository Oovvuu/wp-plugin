import React from 'react';
import oovvuuData from 'components/app/context';
import ActionButton from 'components/shared/actionButton';
import getVideos from 'services/getVideos';
import getPostAttribute from 'services/getPostAttribute';
import { confirmThenProceed, displayDismissableAlert } from 'services/alert';
import theme from 'shared/theme.scss';
import SearchIcon from 'assets/search.svg';
import CloseIcon from 'assets/close.svg';
import KeywordSelector from './keywordSelector';
import styles from './keywordPanel.scss';

/**
 * Wrapper component for the keyword selector panel. Includes generated
 *   and user-supplied keywords.
 */
const KeywordPanelWrapper = () => {
  const { i18n: { __ } } = wp;
  const {
    dispatch,
    state: { recommendedKeywords, selectedKeywords, userKeywords },
  } = React.useContext(oovvuuData);
  const id = getPostAttribute('id');

  /**
   * onClick handler for Clear Selection button to clear selected keywords.
   */
  const clearSelectedKeywords = () => {
    confirmThenProceed(
      { message: __('Are you sure you want to clear your selected keywords?', 'oovvuu') },
      __('Yes, clear', 'oovvuu'),
      () => { dispatch({ type: 'CLEAR_SELECTED_AND_USER_KEYWORDS' }); },
    );
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
    dispatch({ type: 'CLEAR_TOPICS' });
    dispatch({ type: 'SET_LOADING_STATE' });

    const response = await getVideos([...selectedKeywords, ...userKeywords], id);
    const {
      hasError,
      data,
      error: {
        message,
      } = {},
    } = response;

    if (!hasError) {
      const { videos, alternateSearches } = data;
      dispatch({ payload: videos, type: 'UPDATE_RECOMMENDED_VIDEOS' });

      dispatch({ payload: alternateSearches, type: 'UPDATE_RECOMMENDED_TOPICS' });
    } else {
      dispatch({ type: 'CLEAR_LOADING_STATE' });

      displayDismissableAlert({ message });
    }
  };

  return (
    <div className={theme.panelWithHeading}>
      <h3 className={theme.panelHeading}>{__('Recommended Keywords', 'oovvuu')}</h3>
      <KeywordSelector />

      {recommendedKeywords.length > 0
        && (
        <div className={styles.description}>
          { /* eslint-disable-next-line max-len */ }
          <p>{__('Select the most contextually relevant keywords and add any additional keywords to ensure your receive the best video recommendation', 'oovvuu')}</p>
        </div>
        )}

      <div className={styles.buttonWrapper}>
        {(selectedKeywords.length > 0 || userKeywords.length > 0)
          && (
            <ActionButton
              buttonStyle="primary"
              onClickHandler={clearSelectedKeywords}
              className={styles.clearSelection}
            >
              <CloseIcon />
              {__('Clear Selection', 'oovvuu')}
            </ActionButton>
          )}

        {recommendedKeywords.length === 0
          && (
            <ActionButton
              buttonStyle="primary"
              className={styles.getKeywords}
              onClickHandler={() => dispatch({ type: 'FETCH_KEYWORDS' })}
            >
              <>{__('Get Keywords', 'oovvuu')}</>
            </ActionButton>
          )}

        <ActionButton
          buttonStyle="primary"
          onClickHandler={handleFetchVideos}
          disabled={!(selectedKeywords.length > 0 || userKeywords.length > 0)}
          className={styles.getVideos}
        >
          <SearchIcon />
          {__('Recommend Videos', 'oovvuu')}
        </ActionButton>
      </div>
    </div>
  );
};

export default KeywordPanelWrapper;
