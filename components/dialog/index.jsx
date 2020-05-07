import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from './dialog';
import getKeywords from '../../services/getKeywords';

const { __ } = wp.i18n;

/**
 * The Dialog container.
 */
const DialogWrapper = (props) => {
  const {
    keywords = [],
    setKeywords,
    positions = [],
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
        <p>
          Current positions:
          {positions}
        </p>
        <button type="button">Test button</button>
      </Dialog>
    </>
  );
};

DialogWrapper.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  setKeywords: PropTypes.func.isRequired,
  positions: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default DialogWrapper;
