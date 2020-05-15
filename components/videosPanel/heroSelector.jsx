import React from 'react';
import OovvuuData from 'components/app/oovvuuDataContext';
import PositionWrapper from 'components/position';
import PositionToggle from 'components/positionToggle';
import VideoCardWrapper from 'components/videoCard';

/**
 * Stub component for the videos panel.
 */
const VideosPanel = () => {
  const { i18n: { __ } } = wp;
  const { state: { recommendedVideos: { hero } } } = React.useContext(OovvuuData);

  return (
    <PositionWrapper>
      <header>
        <h3>{__('Hero', 'oovvuu')}</h3>
        <PositionToggle />
      </header>
      <div>
        {hero.map(({ id, thumbnail, title }) => (
          <VideoCardWrapper
            id={id}
            thumbnail={thumbnail}
            title={title}
          />
        ))}
      </div>
    </PositionWrapper>
  );
};

export default VideosPanel;
