import React from 'react';
import PropTypes from 'prop-types';
import oovvuuData from 'components/app/context';
import ActionButton from 'components/actionButton';
import getVideos from 'services/getVideos';
import getPostAttribute from 'services/getPostAttribute';
import getPositionKeys from 'services/getPositionKeys';
import theme from 'shared/theme.scss';
import SearchIcon from 'assets/search.svg';
import CloseIcon from 'assets/close.svg';
import KeywordSelector from './keywordSelector';
import styles from './keywordPanel.scss';

/**
 * Wrapper component for the keyword selector panel. Includes generated
 *   and user-supplied keywords.
 */
const KeywordPanelWrapper = (props) => {
  const { onHandleDisplayPanels } = props;
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
    const confirmDialog = confirm( // eslint-disable-line no-restricted-globals, no-alert
      __('Are you sure you want to clear your selected keywords?', 'oovvuu'),
    );

    if (confirmDialog === true) {
      dispatch({ type: 'CLEAR_SELECTED_AND_USER_KEYWORDS' });
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
    dispatch({ type: 'CLEAR_TOPICS' });

    dispatch({
      type: 'SET_LOADING_STATE',
      payload: {
        message: __('Fetching videos based on selected keywords', 'oovvuu'),
      },
    });

    const response = await getVideos([...selectedKeywords, ...userKeywords], id);

    if (!response.hasError) {
      const { videos, alternateSearches } = response.data;
      dispatch({ payload: videos, type: 'UPDATE_RECOMMENDED_VIDEOS' });

      dispatch({ payload: alternateSearches, type: 'UPDATE_RECOMMENDED_TOPICS' });

      /*
       * Each position is enabled by default, but the API may disable a position.
       * Ensure that each position's state is consistent with the getVideos response.
       */
      getPositionKeys().forEach((positionKey) => {
        // Disable a position if the API sends back a positionEmptyReason.
        if (videos[`${positionKey}EmptyReason`] != null) {
          dispatch({ payload: { position: positionKey }, type: 'DISABLE_POSITION' });
        } else {
          dispatch({ payload: { position: positionKey }, type: 'ENABLE_POSITION' });
        }
      });
    } // @todo else, set error state.

    // Component state change to display panels.
    onHandleDisplayPanels(true);
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
          disabled={!recommendedKeywords.length}
          className={styles.getVideos}
        >
          <SearchIcon />
          {__('Recommend Videos', 'oovvuu')}
        </ActionButton>
      </div>
    </div>
  );
};

KeywordPanelWrapper.propTypes = {
  onHandleDisplayPanels: PropTypes.func.isRequired,
};

export default KeywordPanelWrapper;
