import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import oovvuuData from 'components/app/context';
import ActionButton from 'components/actionButton';
import getKeywords from 'services/getKeywords';
import getPositionKeys from 'services/getPositionKeys';
import getVideos from 'services/getVideos';
import getPostAttribute from 'services/getPostAttribute';
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
   * onClick handler for the "Get new Keywords" button. Calls the getKeywords
   *   service with details on the current post. On successful response,
   *   dispatches an update to application state to set the recommendedKeywords
   *   from the Oovvuu API.
   *
   * @returns {Promise<void>} Future for response data or error object.
   */
  const handleFetchKeywords = async () => {
    dispatch({
      type: 'SET_LOADING_STATE',
      payload: {
        message: __("Hang tight, we're fetching keywords", 'oovvuu'),
      },
    });

    const title = getPostAttribute('title');
    const content = getPostAttribute('content');

    const response = await getKeywords(title, content, id);

    if (!response.hasError) {
      const { keywords } = response.data;
      dispatch({ payload: keywords, type: 'UPDATE_RECOMMENDED_KEYWORDS' });
    } // @todo else, set error state.
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
    dispatch({
      type: 'SET_LOADING_STATE',
      payload: {
        message: __('Fetching videos based on selected keywords', 'oovvuu'),
      },
    });

    const response = await getVideos([...selectedKeywords, ...userKeywords], id);

    if (!response.hasError) {
      const { videos } = response.data;
      dispatch({ payload: videos, type: 'UPDATE_RECOMMENDED_VIDEOS' });

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
    <div className={classnames(styles.panel, theme.panel)}>
      <h3>{__('Recommended Keywords', 'oovvuu')}</h3>
      <KeywordSelector />

      {recommendedKeywords.length > 0
        && (
        <div className={styles.description}>
          { /* eslint-disable-next-line max-len */ }
          <p>{__('Select the most contextually relevant keywords and add any additional keywords to ensure your receive the best video recommendation', 'oovvuu')}</p>
        </div>
        )}

      <div className={styles.buttonWrapper}>
        {selectedKeywords && selectedKeywords.length > 0
          && (
            <ActionButton
              buttonStyle="primary"
              // TODO: Add actual clear functionality.
              onClickHandler={() => {}}
            >
              <CloseIcon />
              {__('Clear Selection', 'oovvuu')}
            </ActionButton>
          )}

        {recommendedKeywords.length === 0
          && (
            <ActionButton
              buttonStyle="primary"
              onClickHandler={handleFetchKeywords}
            >
              <>{__('Get Keywords', 'oovvuu')}</>
            </ActionButton>
          )}

        <ActionButton
          buttonStyle="primary"
          onClickHandler={handleFetchVideos}
          disabled={!recommendedKeywords.length}
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
