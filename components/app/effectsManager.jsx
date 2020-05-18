import React from 'react';
import PropTypes from 'prop-types';

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
    actionType, children, dispatch, state,
  } = props;

  /**
   * For a new batch of recommendedVideos, reset selectedVideos on all positions.
   *   Add key to flag current position (for tracking during drag-and-drop
   *   across positions).
   */
  const syncSelectedToRecommendedVideos = () => {
    const { hero, positionTwo } = state.recommendedVideos;
    dispatch({
      payload: {
        hero: hero.map((video) => ({ ...video, position: 'hero' })),
        positionTwo: positionTwo.map((video) => ({ ...video, position: 'two' })),
      },
      type: 'UPDATE_SELECTED_VIDEOS',
    });
  };

  /**
   * Listens for action types that require additional state updates.
   */
  React.useEffect(() => {
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
    recommendedVideos: PropTypes.shape({
      hero: PropTypes.arrayOf(PropTypes.object).isRequired,
      positionTwo: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
};

export default EffectsManager;
