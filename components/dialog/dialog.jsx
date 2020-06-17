import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import portalId from 'services/portalId';
import withTrappedTabs from 'services/withTrappedTabs';
import LoadingWrapper from 'components/dialog/loading';
import OovvuuSVGLogo from 'assets/oovvuu-logo.svg';
import WPVIPSVGLogo from 'assets/wp-vip-logo.svg';
import CloseSVG from 'assets/close.svg';
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

  /**
   * Create references to elements.
   */
  const closeButtonRef = useRef(null);
  const backToTopButtonRef = useRef(null);

  /**
   * Sets focus on modal open to the close button.
   */
  React.useEffect(() => {
    if (isOpen) {
      closeButtonRef.current.focus();
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
            <span className={styles.oovvuuLogo}>
              <OovvuuSVGLogo />
            </span>
            <span className={styles.logoSeparator}>{__('for', 'oovvuu')}</span>
            <span className={styles.wpVipLogo}>
              <WPVIPSVGLogo />
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={closeDialog}
              aria-label={__('Close', 'oovvuu')}
            >
              <CloseSVG />
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
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
  trappedTabsRoot: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLInputElement),
  }).isRequired,
};

const trappedTabsDialog = withTrappedTabs(Dialog);
export default trappedTabsDialog;
