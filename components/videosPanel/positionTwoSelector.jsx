import React from 'react';
import { __ } from '@wordpress/i18n';
// import PropTypes from 'prop-types';
import OovvuuData from 'components/app/oovvuuDataContext';
import PositionWrapper from 'components/position';
import PositionToggle from 'components/positionToggle';
import VideoCardWrapper from 'components/videoCard';

const PositionTwoSelector = () => {
  const { state: { recommendedVideos: { positionTwo } } } = React.useContext(OovvuuData);

  return (
    <PositionWrapper>
      <header>
        <h3>{__('4th Paragraph', 'oovvuu')}</h3>
        <PositionToggle />
      </header>
      <div>
        {positionTwo.map(({ id, thumbnail, title }) => (
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

export default PositionTwoSelector;
