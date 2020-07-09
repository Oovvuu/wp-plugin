import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import saveState from 'services/saveState';
import insertEmbed from 'services/insertEmbed';
import { displayDismissableAlert } from 'services/alert';
import portalId from 'services/portalId';
import withTrappedTabs from 'services/withTrappedTabs';
import getPostAttribute from 'services/getPostAttribute';
import eventBus from 'services/eventBus';
import postIsEmpty from 'services/postIsEmpty';
import OovvuuDataContext from 'components/app/context';
import ActionButton from 'components/shared/actionButton';
import LoadingWrapper from 'components/shared/loading';
import buttons from 'components/shared/actionButton/actionButton.scss';
import OovvuuSVGLogo from 'assets/oovvuu-logo.svg';
import WPVIPSVGLogo from 'assets/wp-vip-logo.svg';
import CloseSVG from 'assets/close.svg';
import SaveSVG from 'assets/save.svg';
import styles from './dialog.scss';

/**
 * The Dialog container.
 */
const Dialog = ({
  isOpen,
  closeDialog,
  children,
  isLoading,
  trappedTabsRoot,
}) => {
  const { __ } = wp.i18n;
  const {
    state,
    state: {
      isPositionTwoEnabled,
      selectedVideos: {
        positionTwo,
      },
    },
    dispatch,
  } = React.useContext(OovvuuDataContext);

  /**
   * Create references to elements.
   */
  const closeButtonRef = useRef(null);
  const backToTopButtonRef = useRef(null);

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
      const positionTwoEmbedId = data?.embeds?.positionTwo?.id;

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

  /**
   * The Oovvuu for WordPress branding.
   */
  const Branding = () => (
    <span className={styles.branding}>
      <span className={styles.oovvuuLogo}>
        <OovvuuSVGLogo />
      </span>
      <span
        className={styles.logoSeparator}
        aria-hidden="true"
      >
        {__('for', 'oovvuu')}
      </span>
      <span className={styles.wpVipLogo}>
        <WPVIPSVGLogo />
      </span>
      <h1 className="screen-reader-only">{__('Oovvuu for WordPress', 'oovvuu')}</h1>
    </span>
  );

  /**
   * Conditionally sets focus on modal open to either the close button or the
   * user keywords' chipInput.
   */
  React.useEffect(() => {
    if (isOpen) {
      if (postIsEmpty()) {
        eventBus.dispatch('focusUserKeywordInput');
      } else {
        closeButtonRef.current.focus();
      }
    }
  }, [isOpen]);

  // The Dialog React element.
  const dialogElement = (
    <div
      className={styles.overlay}
      aria-hidden={!isOpen}
      tabIndex="-1"
      id="oovvuu-dialog-wrapper"
    >
      <div
        ref={trappedTabsRoot}
        className={styles.dialog}
        aria-busy={isLoading}
      >
        <div
          className={styles.container}
          aria-hidden={isLoading}
        >
          <div className={styles.header}>
            <Branding />

            <ActionButton
              className={styles.saveButton}
              onClickHandler={handleSave}
            >
              <SaveSVG />
              <>{__('Save and Close', 'oovvuu')}</>
            </ActionButton>

            <button
              ref={closeButtonRef}
              type="button"
              className={classnames(styles.closeButton, buttons.buttonIcon)}
              onClick={closeDialog}
              aria-label={__('Close', 'oovvuu')}
            >
              <span>
                <CloseSVG />
              </span>
            </button>
          </div>

          <div className={styles.content}>
            {children}
          </div>

          <button
            className="screen-reader-shortcut"
            ref={backToTopButtonRef}
            type="button"
            aria-label={__('Back to Top of Modal', 'oovvuu')}
          />
        </div>
        {isLoading && <LoadingWrapper />}
      </div>
    </div>
  );

  // The dialog container div.
  const dialogContainerEl = document.getElementById(portalId);

  // Ensure the DOMNode exists before creating a portal for it.
  return dialogContainerEl ? createPortal(
    dialogElement,
    dialogContainerEl,
  ) : dialogElement;
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
  isLoading: PropTypes.bool.isRequired,
  trappedTabsRoot: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLElement),
  }).isRequired,
};

const trappedTabsDialog = withTrappedTabs(Dialog);
export default trappedTabsDialog;
