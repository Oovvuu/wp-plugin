import React from 'react';
import { __ } from '@wordpress/i18n';
// import PropTypes from 'prop-types';
import OovvuuData from 'components/app/oovvuuDataContext';

const PositionTwoSelector = () => {
  const { state: { recommendedVideos: { positionTwo } } } = React.useContext(OovvuuData);

  return (
    <>
      <h3>{__('4th Paragraph', 'oovvuu')}</h3>
      <div>
        {positionTwo.map((value) => (
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

export default PositionTwoSelector;
