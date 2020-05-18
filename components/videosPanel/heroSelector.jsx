import React from 'react';
import OovvuuData from 'components/app/oovvuuDataContext';
import PositionWrapper from 'components/position';
import PositionToggle from 'components/positionToggle';
import VideoCardWrapper from 'components/videoCard';

/**
 * Stub component for the videos panel.
 */
const HeroSelector = () => {
  const { i18n: { __ } } = wp;
  const { state: { recommendedVideos: { hero } } } = React.useContext(OovvuuData);

  return (
    <PositionWrapper>
      <header>
        <h3>{__('Hero', 'oovvuu')}</h3>
        <PositionToggle />
      </header>
      <div>
        {hero.map(({
          id, thumbnail, title, preview,
        }) => (
          <VideoCardWrapper
            id={id}
            thumbnail={thumbnail}
            title={title}
            preview={preview}
          />
        ))}
      </div>
    </PositionWrapper>
  );
};

export default HeroSelector;
