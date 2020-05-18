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

  return (
    <>
      <PositionWrapper
        positionTitle={__('Hero', 'oovvuu')}
        videos={hero || []}
      />
      <PositionWrapper
        positionTitle={__('Position Two', 'oovvuu')}
        videos={positionTwo || []}
      />
    </>
  );
};

export default PositionsPanelWrapper;
