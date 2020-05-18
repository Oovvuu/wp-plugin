import React from 'react';
import OovvuuDataContext from 'components/app/context';
import PositionWrapper from './position';

/**
 * The position panel container component that wraps all logic for the positions
 * display.
 */
const PositionsPanelWrapper = () => {
  const { i18n: { __ } } = wp;
  const { state: { selectedVideos: { hero, positionTwo } } } = React.useContext(OovvuuDataContext);

  /**
   * Load the positions panel when any of the positions have a video.
   */
  const positionPanel = hero.length || positionTwo.length ? (
    <>
      <PositionWrapper
        positionKey="hero"
        title={__('Hero', 'oovvuu')}
        videos={hero}
      />
      <PositionWrapper
        positionKey="positionTwo"
        title={__('Position Two', 'oovvuu')}
        videos={positionTwo}
      />
    </>
  ) : '';

  return positionPanel;
};

export default PositionsPanelWrapper;
