import React from 'react';
import ActionButton from 'components/shared/actionButton';
import getPostAttribute from 'services/getPostAttribute';
import eventBus from 'services/eventBus';
import OovvuuDataContext from 'components/app/context';
import OovvuuSmallSVGLogo from 'assets/oovvuu-small-logo.svg';
import TopicsPanelWrapper from './topicsPanel';
import PositionsPanelWrapper from './positionsPanel';
import KeywordPanel from './keywordPanel';
import Dialog from './dialog';
import styles from './dialog.scss';

/**
 * The Dialog container.
 */
const DialogWrapper = () => {
  const { i18n: { __ } } = wp;
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    state: {
      isLoadedFromMeta,
      isLoading,
      sidebarSelectedHeroVideo,
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
    eventBus.dispatch('oovvuuPauseVideo');

    // Remove body class.
    const body = document.querySelector('.wp-admin.wp-core-ui');

    if (body && body.classList.contains('modal-open')) {
      body.classList.remove('modal-open');
    }

    dispatch({ type: 'CLEAR_LOADING_STATE' });
  };

  return (
    <>
      <ActionButton
        disabled={(undefined !== sidebarSelectedHeroVideo.id)}
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
        closeDialog={closeDialog}
      >
        <header className={styles.titleWrapper}>
          <h2 className={styles.postTitle}>
            {getPostAttribute('title')}
          </h2>
        </header>
        <KeywordPanel />
        <TopicsPanelWrapper />
        <PositionsPanelWrapper />
      </Dialog>
    </>
  );
};

export default DialogWrapper;
