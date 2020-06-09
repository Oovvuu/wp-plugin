import React from 'react';
import PropTypes from 'prop-types';
import getKeywords from 'services/getKeywords';
import getPositionKeys from 'services/getPositionKeys';
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
    state: { recommendedVideos, selectedAlternateSearches, selectedKeywords },
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
    dispatch({
      type: 'UPDATE_SELECTED_KEYWORDS',
      payload: selectedKeywords.filter((keyword) => keyword === keywordMatch),
    });

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
    }

    dispatch({ type: 'CLEAR_LOADING_STATE' });
  };

  /**
   * Listens for action types that require additional state updates.
   */
  React.useEffect(() => {
    if (actionType === 'FETCH_KEYWORDS') {
      fetchKeywords();
    }

    if (actionType === 'UPDATE_RECOMMENDED_VIDEOS') {
      syncSelectedToRecommendedVideos();
    }

    // Actions for which the loading state should be cleared.
    const loadingActions = [
      'UPDATE_RECOMMENDED_KEYWORDS',
      'UPDATE_RECOMMENDED_VIDEOS',
    ];

    if (loadingActions.includes(actionType)) {
      dispatch({ type: 'CLEAR_LOADING_STATE' });
    }

    if (actionType === 'SELECT_ALTERNATE_SEARCH') {
      const [topic] = selectedAlternateSearches;

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
    selectedAlternateSearches: PropTypes.arrayOf(PropTypes.shape({
      keywordMatch: PropTypes.string.isRequired,
    })).isRequired,
    selectedKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default EffectsManager;
