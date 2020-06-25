import React from 'react';
import PropTypes from 'prop-types';
import POSITION_KEYS from 'constants/positionKeys';
import getKeywords from 'services/getKeywords';
import getPostAttribute from 'services/getPostAttribute';
import getTopicVideos from 'services/getTopicVideos';
import saveState from 'services/saveState';
import { displayDismissableAlert } from 'services/alert';

/**
 * Container component to manage side effects related to dispatched context actions. Discrete
 *   actions that affect a single slice of state should go in the state reducer.
 *   The useEffect hook here should be used only to dispatch follow-on actions.
 *   Inspiration here is drawn from redux-thunk for composing actions to manage side effects
 *   and keep reducers lean:
 *
 * @link https://github.com/reduxjs/redux-thunk
 */
const EffectsManager = (props) => {
  const {
    actionType,
    children,
    dispatch,
    state,
    state: {
      recommendedKeywords,
      recommendedVideos: {
        hero,
        heroEmptyReason,
        heroSecondary,
        positionTwo,
        positionTwoEmptyReason,
        positionTwoSecondary,
      },
      recommendedVideos,
      selectedTopics,
    },
  } = props;

  /**
   * Calls the getKeywords service with details on the current post. On successful response,
   *   dispatches an update to application state to set the recommendedKeywords
   *   from the Oovvuu API.
   */
  const fetchKeywords = async () => {
    const id = getPostAttribute('id');
    const title = getPostAttribute('title');
    const content = getPostAttribute('content');

    /*
     * If there is no title or body content to
     * send to the keyword fetch API, focus cursor on
     * custom keyword input.
     *
     * @TODO test cases with only a title
     * @TODO test cases with only content
     */
    if (!title.length && !content.length) {
      // @TODO focus cursor on custom key words input.

      // bail early.
      return;
    }

    dispatch({ type: 'SET_LOADING_STATE' });

    const response = await getKeywords(title, content, id);
    const {
      hasError,
      data: {
        keywords,
      } = {},
      error: {
        message,
      } = {},
    } = response;

    dispatch({ type: 'CLEAR_LOADING_STATE' });

    if (!hasError) {
      dispatch({ payload: keywords, type: 'UPDATE_RECOMMENDED_KEYWORDS' });
    } else {
      displayDismissableAlert({ message });
    }
  };


  /**
   * For a new batch of recommendedVideos, reset selectedVideos on all positions.
   *   Add key to flag current position (for tracking during drag-and-drop
   *   across positions).
   */
  const syncSelectedToRecommendedVideos = () => {
    dispatch({
      payload: {
        hero: hero.map((video) => ({ ...video, position: 'hero' })),
        heroSecondary: heroSecondary.map((video) => ({ ...video, position: 'heroSecondary' })),
        positionTwo: positionTwo.map((video) => ({ ...video, position: 'positionTwo' })),
        positionTwoSecondary: positionTwoSecondary.map((video) => ({ ...video, position: 'positionTwoSecondary' })),
      },
      type: 'UPDATE_SELECTED_VIDEOS',
    });
  };

  /**
   * Orchestrates state updates and API call for user selection of a topic (alternate search).
   *
   * @param {Object} topic Selected topic object.
   */
  const handleSelectTopic = async (topic) => {
    const { keywordMatch } = topic;

    // Clear the keywords.
    dispatch({ type: 'CLEAR_SELECTED_AND_USER_KEYWORDS' });

    // Select keyword.
    if (recommendedKeywords.includes(keywordMatch)) {
      dispatch({
        type: 'UPDATE_SELECTED_KEYWORDS',
        payload: [keywordMatch],
      });
    } else {
      // Add keyword as a user keyword.
      dispatch({
        type: 'UPDATE_USER_KEYWORDS',
        payload: [keywordMatch],
      });
    }

    const id = getPostAttribute('id');

    dispatch({ type: 'SET_LOADING_STATE' });

    const response = await getTopicVideos([keywordMatch], id);

    if (!response.hasError) {
      const { videos } = response.data;
      const { alternateSearches } = recommendedVideos;
      dispatch({ payload: { ...videos, alternateSearches }, type: 'UPDATE_RECOMMENDED_VIDEOS' });
    }

    dispatch({ type: 'CLEAR_LOADING_STATE' });
  };

  /*
   * Each position is enabled by default, but the API may disable a position.
   * Ensure that each position's state is consistent with the recommended videos response.
   */
  const syncPositionsToRecommendedVideos = () => {
    POSITION_KEYS.forEach((key) => {
      // Disable a position if the API sends back a positionEmptyReason.
      dispatch({
        payload: { position: key },
        type: recommendedVideos[`${key}EmptyReason`] !== null ? 'DISABLE_POSITION' : 'ENABLE_POSITION',
      });
    });
  };

  /**
   * Load the positions panel when any of the positions have an empty reason or a video.
   */
  const derivePositionsPanelVisibility = () => {
    if (heroEmptyReason || positionTwoEmptyReason || hero.length || positionTwo.length) {
      dispatch({ type: 'SHOW_POSITIONS_PANEL' });
    }
  };

  /**
   * Save the overall context state to post meta.
   */
  const saveDatatoPostMeta = async () => {
    // Save the state.
    const response = await saveState(state, getPostAttribute('id'));
    const {
      hasError,
      data,
      error: {
        message,
      } = {},
    } = response;

    if (!hasError) {
      /**
       * saveState() returns updated state, with flag that data has been loaded
       *   from meta. This needs to be sync'd back to state.
       */
      dispatch({ type: 'RESET_STATE', payload: data });
    } else {
      displayDismissableAlert({ message });
    }
  };

  /**
   * Listens for action types that require additional state updates.
   */
  React.useEffect(() => {
    if (actionType === 'FETCH_KEYWORDS') {
      fetchKeywords();
    }

    if (actionType === 'UPDATE_RECOMMENDED_VIDEOS') {
      derivePositionsPanelVisibility();
      syncPositionsToRecommendedVideos();
      syncSelectedToRecommendedVideos();
    }

    if (actionType === 'UPDATE_SIDEBAR_HERO_EMBED') {
      saveDatatoPostMeta();
    }

    // Actions for which the loading state should be cleared.
    const loadingActions = [
      'UPDATE_RECOMMENDED_KEYWORDS',
      'UPDATE_RECOMMENDED_VIDEOS',
    ];

    if (loadingActions.includes(actionType)) {
      dispatch({ type: 'CLEAR_LOADING_STATE' });
    }

    if (actionType === 'UPDATE_SELECTED_TOPICS') {
      const [topic] = selectedTopics;

      handleSelectTopic(topic);
    }
  }, [actionType]);

  return <>{ children }</>;
};

EffectsManager.defaultProps = { actionType: null };

EffectsManager.propTypes = {
  actionType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    recommendedKeywords: PropTypes.arrayOf(PropTypes.string),
    recommendedVideos: PropTypes.shape({
      alternateSearches: PropTypes.arrayOf(PropTypes.object).isRequired,
      hero: PropTypes.arrayOf(PropTypes.object).isRequired,
      heroEmptyReason: PropTypes.string,
      heroSecondary: PropTypes.arrayOf(PropTypes.object).isRequired,
      positionTwo: PropTypes.arrayOf(PropTypes.object).isRequired,
      positionTwoEmptyReason: PropTypes.string,
      positionTwoSecondary: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    selectedTopics: PropTypes.arrayOf(PropTypes.shape({
      keywordMatch: PropTypes.string.isRequired,
    })).isRequired,
    selectedKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default EffectsManager;
