import React from 'react';
import PropTypes from 'prop-types';
import LOADING_ACTIONS from 'constants/loadingActions';
import POSITION_KEYS from 'constants/positionKeys';
import getKeywords from 'services/getKeywords';
import getPostAttribute from 'services/getPostAttribute';
import getTopicVideos from 'services/getTopicVideos';

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
  const { i18n: { __ } } = wp;
  const {
    actionType,
    children,
    dispatch,
    state: {
      recommendedVideos, recommendedKeywords, selectedTopics,
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
    dispatch({
      type: 'SET_LOADING_STATE',
      payload: {
        message: __("Hang tight, we're fetching keywords", 'oovvuu'),
      },
    });

    const response = await getKeywords(title, content, id);

    dispatch({ type: 'CLEAR_LOADING_STATE' });

    if (!response.hasError) {
      const { keywords } = response.data;
      dispatch({ payload: keywords, type: 'UPDATE_RECOMMENDED_KEYWORDS' });
    }
  };


  /**
   * For a new batch of recommendedVideos, reset selectedVideos on all positions.
   *   Add key to flag current position (for tracking during drag-and-drop
   *   across positions).
   */
  const syncSelectedToRecommendedVideos = () => {
    const {
      hero, heroSecondary, positionTwo, positionTwoSecondary,
    } = recommendedVideos;
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

    dispatch({
      type: 'SET_LOADING_STATE',
      payload: {
        message: __("Hang tight, we're fetching topic video recommendations", 'oovvuu'),
      },
    });

    const response = await getTopicVideos([keywordMatch], id);

    if (!response.hasError) {
      const { videos } = response.data;
      const { alternateSearches } = recommendedVideos;
      dispatch({ payload: { ...videos, alternateSearches }, type: 'UPDATE_RECOMMENDED_VIDEOS' });
    }

    dispatch({ type: 'CLEAR_LOADING_STATE' });
  };

  const syncPositionsToRecommendedVideos = () => {
    /*
     * Each position is enabled by default, but the API may disable a position.
     * Ensure that each position's state is consistent with the recommended videos response.
     */
    POSITION_KEYS.forEach((key) => {
      // Disable a position if the API sends back a positionEmptyReason.
      dispatch({
        payload: { position: key },
        type: recommendedVideos[`${key}EmptyReason`] !== null ? 'DISABLE_POSITION' : 'ENABLE_POSITION',
      });
    });
  };

  /**
   * Listens for action types that require additional state updates.
   */
  React.useEffect(() => {
    if (actionType === 'FETCH_KEYWORDS') {
      fetchKeywords();
    }

    if (actionType === 'UPDATE_RECOMMENDED_VIDEOS') {
      syncPositionsToRecommendedVideos();
      syncSelectedToRecommendedVideos();
    }

    // Guard to force clear loading for certain action types..
    if (LOADING_ACTIONS.includes(actionType)) {
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
      heroSecondary: PropTypes.arrayOf(PropTypes.object).isRequired,
      positionTwo: PropTypes.arrayOf(PropTypes.object).isRequired,
      positionTwoSecondary: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    selectedTopics: PropTypes.arrayOf(PropTypes.shape({
      keywordMatch: PropTypes.string.isRequired,
    })).isRequired,
    selectedKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default EffectsManager;
