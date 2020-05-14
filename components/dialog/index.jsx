import React from 'react';
import { __ } from '@wordpress/i18n';
import OovvuuData from 'components/app/oovvuuDataContext';
import KeywordPanel from 'components/keywordPanel/keywordPanel';
import getPostAttribute from 'services/getPostAttribute';
import Dialog from './dialog';

/**
 * The Dialog container.
 */
const DialogWrapper = () => {
  const {
    state: {
      recommendedVideos: { hero, positionTwo },
    },
  } = React.useContext(OovvuuData);
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
        <KeywordPanel />
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
      </Dialog>
    </>
  );
};

export default DialogWrapper;
