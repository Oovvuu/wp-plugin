import React from 'react';
import { __ } from '@wordpress/i18n';
import KeywordPanel from 'components/keywordPanel/keywordPanel';
import getPostAttribute from 'services/getPostAttribute';
import Dialog from './dialog';
import VideosPanel from '../videosPanel/videosPanel';

/**
 * The Dialog container.
 */
const DialogWrapper = () => {
  const [isOpen, setIsOpen] = React.useState(false);

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
        <KeywordPanel />
        <VideosPanel />
      </Dialog>
    </>
  );
};

export default DialogWrapper;
