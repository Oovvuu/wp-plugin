import React from 'react';
import KeywordPanel from 'components/keywordPanel';
import PositionsPanelWrapper from 'components/positionsPanel';
import getPostAttribute from 'services/getPostAttribute';
import saveState from 'services/saveState';
import oovvuuData from 'components/app/context';
import Dialog from './dialog';
import styles from './dialog.scss';

/**
 * The Dialog container.
 */
const DialogWrapper = () => {
  const { i18n: { __ } } = wp;
  const [isOpen, setIsOpen] = React.useState(false);
  const { state } = React.useContext(oovvuuData);

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

  /**
   * Handles the save action when a user clicks the save button.
   */
  const handleSave = async () => {
    const response = await saveState(state, getPostAttribute('id'));

    if (!response.hasError) {
      // Close the Dialog.
      closeDialog();
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
        onHandleSave={handleSave}
      >
        <h2 className={styles.postTitle}>{getPostAttribute('title')}</h2>
        <KeywordPanel />
        <PositionsPanelWrapper />
      </Dialog>
    </>
  );
};

export default DialogWrapper;
