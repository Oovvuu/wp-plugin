import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from './dialog';
import getKeywords from '../../services/getKeywords';
import getVideos from '../../services/getVideos';

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

  // Get the post title.
  const postTitle = wp.data.select('core/editor').getEditedPostAttribute('title');

  /**
   * Updates the keywords based on the current post title and content.
   */
  const updateKeywords = () => {
    const content = wp.data.select('core/editor').getEditedPostAttribute('content');
    const id = wp.data.select('core/editor').getEditedPostAttribute('id');

    // Get keywords based on the current post title and content.
    getKeywords(postTitle, content, id)
      .then((value) => {
        if (value.data.analyseText.wordings) {
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
    const id = wp.data.select('core/editor').getEditedPostAttribute('id');

    // Get keywords based on the current post title and content.
    // TODO use keywords from state.
    getVideos(['covid'], id)
      .then((value) => {
        if (value.data.videosForArticle) {
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
        <h2>{postTitle}</h2>
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
        <p>
          <button
            type="button"
            onClick={fetchVideos}
          >
            {__('Fetch Videos', 'oovvuu')}
          </button>
        </p>
      </Dialog>
    </>
  );
};

DialogWrapper.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  setKeywords: PropTypes.func.isRequired,
  positions: PropTypes.objectOf(PropTypes.array).isRequired,
  setPositions: PropTypes.func.isRequired,
};

export default DialogWrapper;
