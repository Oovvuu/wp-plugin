import React from 'react';
import OovvuuDataContext from 'components/app/oovvuuDataContext';
import PositionWrapper from './position';

/**
 * The position panel container component that wraps all logic for the positions
 * display.
 */
const PositionsPanelWrapper = () => {
  const { i18n: { __ } } = wp;
  const { state: { selectedVideos: { hero, positionTwo } } } = React.useContext(OovvuuDataContext);

  return hero.length && positionTwo.length && (
    <>
      <PositionWrapper title={__('Hero', 'oovvuu')} videos={hero} />
      <PositionWrapper title={__('Position Two', 'oovvuu')} videos={positionTwo} />
    </>
  );
};

export default PositionsPanelWrapper;
