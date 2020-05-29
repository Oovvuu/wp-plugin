import React from 'react';
import PropTypes from 'prop-types';
import getKeywords from 'services/getKeywords';
import getPostAttribute from 'services/getPostAttribute';

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
    state: { recommendedVideos },
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
   * Listens for action types that require additional state updates.
   */
  React.useEffect(() => {
    if (actionType === 'FETCH_KEYWORDS') {
      fetchKeywords();
    }

    if (actionType === 'UPDATE_RECOMMENDED_VIDEOS') {
      syncSelectedToRecommendedVideos();
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
      hero: PropTypes.arrayOf(PropTypes.object).isRequired,
      heroSecondary: PropTypes.arrayOf(PropTypes.object).isRequired,
      positionTwo: PropTypes.arrayOf(PropTypes.object).isRequired,
      positionTwoSecondary: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
};

export default EffectsManager;
