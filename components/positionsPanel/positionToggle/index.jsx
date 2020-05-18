import React from 'react';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import PositionToggle from './positionToggle';

/**
 * Displays the toggle to enable/disable a position.
 */
const PositionToggleWrapper = (props) => {
  const { positionKey } = props;
  const { state: { isHeroEnabled, isPositionTwoEnabled } } = React.useContext(OovvuuDataContext);

  /**
   * Toggles the position enable/disable state.
   */
  const togglePosition = () => {
    console.log(positionKey);
    console.log(isHeroEnabled);
    console.log(isPositionTwoEnabled);
    console.log('Position state');
  };

  return (
    <PositionToggle
      togglePosition={togglePosition}
    />
  );
};

PositionToggleWrapper.propTypes = {
  positionKey: PropTypes.string.isRequired,
};

export default PositionToggleWrapper;
