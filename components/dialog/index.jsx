import React from 'react';
import KeywordPanel from 'components/keywordPanel';
import PositionsPanelWrapper from 'components/positionsPanel';
import TopicsPanelWrapper from 'components/topicsPanel';
import ActionButton from 'components/actionButton';
import getPostAttribute from 'services/getPostAttribute';
import saveState from 'services/saveState';
import OovvuuDataContext from 'components/app/context';
import SaveSVG from 'assets/save.svg';
import OovvuuSmallSVGLogo from 'assets/oovvuu-small-logo.svg';
import insertEmbed from 'services/insertEmbed';
import { confirmThenProceed, displayDismissableAlert } from 'services/alert';
import Dialog from './dialog';
import styles from './dialog.scss';

/**
 * The Dialog container.
 */
const DialogWrapper = () => {
  const { i18n: { __ } } = wp;
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    state,
    state: {
      isLoadedFromMeta,
      isLoading,
      isPositionTwoEnabled,
      selectedVideos: {
        positionTwo,
      },
    },
    dispatch,
  } = React.useContext(OovvuuDataContext);

  /**
   * Open the dialog. If no embeds exist, dispatch FETCH_KEYWORDS action to trigger effect.
   */
  const openDialog = () => {
    setIsOpen(true);

    // Add body class.
    const body = document.querySelector('.wp-admin.wp-core-ui');

    if (body && !body.classList.contains('modal-open')) {
      body.classList.add('modal-open');
    }

    if (!isLoadedFromMeta) {
      dispatch({ type: 'FETCH_KEYWORDS' });
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

    dispatch({ type: 'CLEAR_LOADING_STATE' });
  };

  /**
   * Prompt the user with a confirm message prior to closing the dialog.
   */
  const promptToClose = () => {
    confirmThenProceed(
      { message: __('Are you sure you want exit the Oovvuu modal without saving?', 'oovvuu') },
      __('Yes, close', 'oovvuu'),
      closeDialog,
    );
  };

  /**
   * Handles the save action when a user clicks the save button.
   */
  const handleSave = async () => {
    dispatch({ type: 'SET_LOADING_STATE' });

    // Note: Loading state is cleared within the `saveState` service.
    const response = await saveState(state, getPostAttribute('id'));
    const {
      hasError,
      data,
      error: {
        message,
      } = {},
    } = response;

    if (!hasError) {
      // Embed id.
      const positionTwoEmbedId = data?.embeds?.positionTwo?.id || null;

      // Insert a new Oovvuu embed to the editor.
      insertEmbed(positionTwoEmbedId, positionTwo, isPositionTwoEnabled);

      /**
       * saveState() returns updated state, with flag that data has been loaded
       *   from meta. This needs to be sync'd back to state.
       */
      dispatch({ type: 'RESET_STATE', payload: data });

      // Close the Dialog.
      closeDialog();
    } else {
      dispatch({ type: 'CLEAR_LOADING_STATE' });

      displayDismissableAlert({ message });
    }
  };

  return (
    <>
      <ActionButton
        type="button"
        buttonStyle="primary"
        onClickHandler={openDialog}
        isDialog
        isDialogOpen={isOpen}
        dialogOwner="oovvuu-dialog-wrapper"
      >
        <OovvuuSmallSVGLogo />
        <>{__('Get Videos', 'oovvuu')}</>
      </ActionButton>
      <Dialog
        isOpen={isOpen}
        isLoading={isLoading}
        closeDialog={promptToClose}
      >
        <header className={styles.titleWrapper}>
          <h2 className={styles.postTitle}>
            {getPostAttribute('title')}
          </h2>

          <ActionButton
            className={styles.saveButton}
            buttonStyle="primary"
            onClickHandler={handleSave}
          >
            <SaveSVG />
            <>{__('Save and Close', 'oovvuu')}</>
          </ActionButton>
        </header>
        <KeywordPanel />
        <TopicsPanelWrapper />
        <PositionsPanelWrapper />
      </Dialog>
    </>
  );
};

export default DialogWrapper;
