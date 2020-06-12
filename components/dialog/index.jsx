import React from 'react';
import KeywordPanel from 'components/keywordPanel';
import PositionsPanelWrapper from 'components/positionsPanel';
import TopicsPanelWrapper from 'components/topicsPanel';
import ActionButton from 'components/actionButton';
import getPostAttribute from 'services/getPostAttribute';
import saveState from 'services/saveState';
import OovvuuDataContext from 'components/app/context';
import SaveSVG from 'assets/save.svg';
import insertEmbed from 'services/insertEmbed';
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
    // @todo OVU-34 Replace with alert/prompt component.
    const confirmDialog = confirm( // eslint-disable-line no-restricted-globals, no-alert
      __('Are you sure you want exit the Oovvuu modal without saving?', 'oovvuu'),
    );

    if (confirmDialog === true) {
      closeDialog();
    }
  };

  /**
   * Handles the save action when a user clicks the save button.
   */
  const handleSave = async () => {
    dispatch({
      type: 'SET_LOADING_STATE',
      payload: {
        message: __("Hang tight, we're saving your settings", 'oovvuu'),
      },
    });

    // Note: Loading state is cleared within the `saveState` service.
    const response = await saveState(state, getPostAttribute('id'));

    if (!response.hasError) {
      const { data } = response;

      // Embed id.
      const positionTwoEmbedId = data?.embeds?.positionTwo?.id || null;

      // Insert a new Oovvuu embed to the editor.
      if (positionTwoEmbedId) {
        insertEmbed(positionTwoEmbedId, positionTwo);
      }

      /**
       * saveState() returns updated state, with flag that data has been loaded
       *   from meta. This needs to be sync'd back to state.
       */
      dispatch({ type: 'RESET_STATE', payload: data });

      // Close the Dialog.
      closeDialog();
    } // @todo OVU-34 else, set error state.
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
