import React from 'react';
import OovvuuDataContext from 'components/app/context';
import PositionWrapper from './position';

/**
 * The position panel container component that wraps all logic for the positions
 * display.
 */
const PositionsPanelWrapper = () => {
  const { i18n: { __ } } = wp;
  const {
    state: {
      isHeroEnabled,
      isPositionTwoEnabled,
      recommendedVideos: {
        positionHeroEmptyReason,
        positionTwoEmptyReason,
      },
      selectedVideos: {
        hero,
        positionTwo,
      },
    },
  } = React.useContext(OovvuuDataContext);

  /**
   * Load the positions panel when any of the positions have a video.
   *
   * @todo refactor this so that panels always show and make sure
   *       panels don't show before getVideos response. maybe utilize
   *       local component state.
   */
  const positionPanel = hero.length || positionTwo.length ? (
    <>
      <PositionWrapper
        enabled={positionHeroEmptyReason ? false : isHeroEnabled}
        positionEmptyReason={positionHeroEmptyReason}
        positionKey="hero"
        title={__('Hero', 'oovvuu')}
        videos={hero}
      />
      <PositionWrapper
        enabled={positionTwoEmptyReason ? false : isPositionTwoEnabled}
        positionEmptyReason={positionTwoEmptyReason}
        positionKey="positionTwo"
        title={__('Position Two', 'oovvuu')}
        videos={positionTwo}
      />
    </>
  ) : '';

  return positionPanel;
};

export default PositionsPanelWrapper;
