import React from 'react';
import OovvuuDataContext from 'components/app/oovvuuDataContext';
import HeroSelector from './heroSelector';
import PositionTwoSelector from './positionTwoSelector';

/**
 * Stub component for the video player wrapper.
 */
const VideosPanelWrapper = () => {
  const { state: { selectedVideos: { hero, positionTwo } } } = React.useContext(OovvuuDataContext);

  return (
    <>
      {hero && (
        <HeroSelector hero={hero} />
      )}
      {positionTwo?.length && (
        <PositionTwoSelector positionTwo={positionTwo} />
      )}
    </>
  );
};

export default VideosPanelWrapper;
