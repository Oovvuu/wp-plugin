import React from 'react';
import KeywordPanel from 'components/keywordPanel';
import PositionsPanelWrapper from 'components/positionsPanel';
import ActionButton from 'components/actionButton';
import getPostAttribute from 'services/getPostAttribute';
import saveState from 'services/saveState';
import oovvuuData from 'components/app/context';
import SaveSVG from 'assets/save.svg';
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
      selectedVideos,
      isLoading,
    },
    dispatch,
  } = React.useContext(oovvuuData);
  // Set default panel display state.
  const [displayPanels, setDisplayPanels] = React.useState(false);

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
  const closeDialog = (prompt) => {
    const performClose = () => {
      setIsOpen(false);

      // Remove body class.
      const body = document.querySelector('.wp-admin.wp-core-ui');

      if (body && body.classList.contains('modal-open')) {
        body.classList.remove('modal-open');
      }

      dispatch({ type: 'CLEAR_LOADING_STATE' });
    };

    // Prompt the user with a confirm message if they are closing without saving.
    if (prompt) {
      const confirmDialog = confirm( // eslint-disable-line no-restricted-globals, no-alert
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
    dispatch({
      type: 'SET_LOADING_STATE',
      payload: {
        message: __("Hang tight, we're saving your settings", 'oovvuu'),
      },
    });

    const response = await saveState(state, getPostAttribute('id'));

    if (!response.hasError) {
      const { data } = response;

      dispatch({ type: 'UPDATE_EMBEDS', payload: data });
      // Close the Dialog.
      closeDialog(false);
    }
  };

  // Determine if the the panels should display. Accounts for saved videos and fetched videos.
  // @todo This should also check whether or not state data was loaded from post meta.
  React.useEffect(() => {
    setDisplayPanels(selectedVideos.hero.length
      || selectedVideos.positionTwo.length);
  }, [selectedVideos]);

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
        <KeywordPanel
          onHandleDisplayPanels={setDisplayPanels}
        />
        <PositionsPanelWrapper
          displayPanels={displayPanels}
        />
      </Dialog>
    </>
  );
};

export default DialogWrapper;
