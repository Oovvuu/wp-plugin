import React from 'react';
import KeywordPanel from 'components/keywordPanel';
import PositionsPanelWrapper from 'components/positionsPanel';
import ActionButton from 'components/actionButton';
import getPostAttribute from 'services/getPostAttribute';
import saveState from 'services/saveState';
import oovvuuData from 'components/app/context';
import LoadingWrapper from 'components/dialog/loading';
import SaveSVG from 'assets/save.svg';
import Dialog from './dialog';
import styles from './dialog.scss';

/**
 * The Dialog container.
 */
const DialogWrapper = () => {
  const { i18n: { __ } } = wp;
  const [isOpen, setIsOpen] = React.useState(false);
  const { state, state: { isLoading } } = React.useContext(oovvuuData);

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
  const closeDialog = (prompt) => {
    const performClose = () => {
      setIsOpen(false);

      // Remove body class.
      const body = document.querySelector('.wp-admin.wp-core-ui');

      if (body && body.classList.contains('modal-open')) {
        body.classList.remove('modal-open');
      }
    };

    // Prompt the user with a confirm message if they are closing without saving.
    if (prompt) {
      const confirmDialog = confirm( // eslint-disable-line no-restricted-globals
        __('Are you sure you want exit the Oovvuu modal without saving?', 'oovvuu'),
      );

      if (confirmDialog === true) {
        performClose();
      }
    } else {
      performClose();
    }
  };

  /**
   * Handles the save action when a user clicks the save button.
   */
  const handleSave = async () => {
    const response = await saveState(state, getPostAttribute('id'));

    if (!response.hasError) {
      // Close the Dialog.
      closeDialog(false);
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
        closeDialog={() => { closeDialog(true); }}
      >
        <h2 className={styles.postTitle}>
          <span>{getPostAttribute('title')}</span>
          <ActionButton
            className={styles.saveButton}
            buttonStyle="primary"
            onClickHandler={handleSave}
          >
            <SaveSVG />
            <>{__('Save and Close', 'oovvuu')}</>
          </ActionButton>
        </h2>
        <KeywordPanel />
        <PositionsPanelWrapper />
        {isLoading && <LoadingWrapper />}
      </Dialog>
    </>
  );
};

export default DialogWrapper;
