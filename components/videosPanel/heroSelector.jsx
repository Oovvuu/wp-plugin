import React from 'react';
import { __ } from '@wordpress/i18n';
// import PropTypes from 'prop-types';
import OovvuuData from 'components/app/oovvuuDataContext';

const VideosPanel = () => {
  const { state: { recommendedVideos: { hero } } } = React.useContext(OovvuuData);

  return (
    <>
      <h3>{__('Hero', 'oovvuu')}</h3>
      <div>
        {hero.map((value) => (
          <div
            key={value.id}
          >
            <p>{value.title}</p>
            <img src={value.thumbnail.url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosPanel;
