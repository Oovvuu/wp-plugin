import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getKeywords from 'services/getKeywords';
import getPostAttribute from 'services/getPostAttribute';
import getVideos from 'services/getVideos';
import Dialog from './dialog';

const { __ } = wp.i18n;

/**
 * The Dialog container.
 */
const DialogWrapper = (props) => {
  const {
    keywords = [],
    setKeywords,
    positions = {},
    setPositions,
  } = props;

  // Open/close state.
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Open the dialog.
   */
  const openDialog = () => {
    setIsOpen(true);

    // Add body class.
    const body = document.querySelector('.wp-admin.wp-core-ui');

    if (body && !body.classList.contains('modal-open')) {
      body.classList.add('modal-open');
    }
  };

  /**
   * Close the dialog.
   */
  const closeDialog = () => {
    setIsOpen(false);

    // Remove body class.
    const body = document.querySelector('.wp-admin.wp-core-ui');

    if (body && body.classList.contains('modal-open')) {
      body.classList.remove('modal-open');
    }
  };

  // Get the post ID.
  const postID = getPostAttribute('id');

  /**
   * Updates the keywords based on the current post title and content.
   */
  const updateKeywords = () => {
    const title = getPostAttribute('title');
    const content = getPostAttribute('content');

    // Get keywords based on the current post title and content.
    getKeywords(title, content, postID)
      .then((value) => {
        if (
          value !== undefined
          && value.data !== undefined
          && value.data.analyseText !== undefined
          && value.data.analyseText.wordings !== undefined
        ) {
          setKeywords(value.data.analyseText.wordings);
        }
      })
      .catch((error) => {
        // TODO: Perform error handling.
        console.log(error);
      });
  };

  /**
   * Fetchs videos given a set of keywords
   */
  const fetchVideos = () => {
    // Get keywords based on the current post title and content.
    getVideos(keywords, postID)
      .then((value) => {
        if (
          value !== undefined
          && value.data !== undefined
          && value.data.videosForArticle !== undefined
        ) {
          setPositions(value.data.videosForArticle);
        }
      })
      .catch((error) => {
        // TODO: Perform error handling.
        console.log(error);
      });
  };

  // @TODO: Update with actual content.
  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="oovvuu-dialog-wrapper"
        aria-owns="oovvuu-dialog-wrapper"
      >
        {__('Open Dialog', 'oovvuu')}
      </button>
      <Dialog
        isOpen={isOpen}
        closeDialog={closeDialog}
      >
        <h2>{getPostAttribute('title')}</h2>
        <p>{__('Recommended Keywords', 'oovvuu')}</p>
        <input
          type="text"
          className="widefat"
          readOnly
          value={keywords.join(' ')}
        />
        <p>
          <button
            type="button"
            onClick={updateKeywords}
          >
            {__('Get new Keywords', 'oovvuu')}
          </button>
          <button
            type="button"
            onClick={fetchVideos}
          >
            {__('Fetch Videos', 'oovvuu')}
          </button>
        </p>
        <h3>{__('Hero', 'oovvuu')}</h3>
        <div>
          {positions.hero !== undefined && positions.hero.map((value) => (
            <div
              key={value.id}
            >
              <p>{value.title}</p>
              <img src={value.thumbnail.url} alt="" />
            </div>
          ))}
        </div>
        <h3>{__('4th Paragraph', 'oovvuu')}</h3>
        <div>
          {positions.positionTwo !== undefined && positions.positionTwo.map((value) => (
            <div
              key={value.id}
            >
              <p>{value.title}</p>
              <img src={value.thumbnail.url} alt="" />
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};

DialogWrapper.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  setKeywords: PropTypes.func.isRequired,
  positions: PropTypes.shape({
    hero: PropTypes.array,
    heroSecondary: PropTypes.array,
    heroEmptyReason: PropTypes.string,
    positionTwo: PropTypes.array,
    positionTwoSecondary: PropTypes.array,
    positionTwoEmptyReason: PropTypes.string,
  }).isRequired,
  setPositions: PropTypes.func.isRequired,
};

export default DialogWrapper;
