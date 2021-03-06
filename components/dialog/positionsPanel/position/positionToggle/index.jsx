import React from 'react';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import PositionToggle from './positionToggle';

/**
 * Displays the toggle to enable/disable a position.
 */
const PositionToggleWrapper = (props) => {
  const { positionKey, positionEmptyReason } = props;
  const {
    dispatch,
    state: {
      isHeroEnabled,
      isPositionTwoEnabled,
    },
  } = React.useContext(OovvuuDataContext);

  /**
   * Toggles the position enable/disable state.
   */
  const onTogglePosition = () => {
    if (positionEmptyReason === null) {
      dispatch({ type: 'TOGGLE_POSITION_ENABLED', payload: { position: positionKey } });
    }
  };

  /**
   * Determine if the current position is enabled based on the global context.
   *
   * @param  {String} key The position key.
   * @return {Boolean} True or false on whether or not the position is enabled.
   */
  const isPositionEnabled = (key) => {
    if (key === 'hero') {
      return isHeroEnabled;
    } if (key === 'positionTwo') {
      return isPositionTwoEnabled;
    }

    return false;
  };

  return (
    <PositionToggle
      onTogglePosition={onTogglePosition}
      enabled={isPositionEnabled(positionKey)}
    />
  );
};

PositionToggleWrapper.defaultProps = {
  positionEmptyReason: null,
};

PositionToggleWrapper.propTypes = {
  positionKey: PropTypes.string.isRequired,
  positionEmptyReason: PropTypes.string,
};

export default PositionToggleWrapper;
