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
        heroEmptyReason,
        positionTwoEmptyReason,
      },
      selectedVideos: {
        hero,
        positionTwo,
      },
    },
  } = React.useContext(OovvuuDataContext);

  /**
   * Load the positions panel when any of the positions have an empty reason or a video.
   */
  return heroEmptyReason || positionTwoEmptyReason || hero.length || positionTwo.length ? (
    <>
      <PositionWrapper
        enabled={heroEmptyReason ? false : isHeroEnabled}
        positionEmptyReason={heroEmptyReason}
        positionKey="hero"
        title={__('Hero', 'oovvuu')}
        videos={hero}
      />
      <PositionWrapper
        enabled={positionTwoEmptyReason ? false : isPositionTwoEnabled}
        positionEmptyReason={positionTwoEmptyReason}
        positionKey="positionTwo"
        title={__('4th Paragraph', 'oovvuu')}
        videos={positionTwo}
      />
    </>
  ) : null;
};

export default PositionsPanelWrapper;
