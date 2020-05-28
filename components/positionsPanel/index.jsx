import React from 'react';
import PropTypes from 'prop-types';
import OovvuuDataContext from 'components/app/context';
import PositionWrapper from './position';

/**
 * The position panel container component that wraps all logic for the positions
 * display.
 */
const PositionsPanelWrapper = (props) => {
  const { displayPanels } = props;
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
   * Load the positions panel when any of the positions have a video.
   *
   * @todo refactor this so that panels always show and make sure
   *       panels don't show before getVideos response. maybe utilize
   *       local component state.
   */
  const positionPanels = displayPanels ? (
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
  ) : '';

  return positionPanels;
};

PositionsPanelWrapper.propTypes = {
  displayPanels: PropTypes.bool.isRequired,
};

export default PositionsPanelWrapper;
