import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container component to manage synchronization of selections
 *   when recommendedVideos are updated from the Oovvuu API.
 */
const EffectsManager = (props) => {
  const {
    actionType, children, dispatch, state,
  } = props;

  React.useEffect(() => {
    if (actionType === 'UPDATE_RECOMMENDED_VIDEOS') {
      const { hero, positionTwo } = state.recommendedVideos;
      dispatch({ payload: hero[0], type: 'UPDATE_SELECTED_HERO' });
      dispatch({ payload: positionTwo, type: 'UPDATE_SELECTED_POSITION_TWO' });
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
    isHeroEnabled: PropTypes.bool.isRequired,
    recommendedVideos: PropTypes.shape({
      hero: PropTypes.arrayOf(PropTypes.object).isRequired,
      positionTwo: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    selectedVideos: PropTypes.shape({
      hero: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default EffectsManager;
