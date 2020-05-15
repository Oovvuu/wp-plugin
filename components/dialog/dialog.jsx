import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
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
}) => {
  const { __ } = wp.i18n;
  /**
   * Create references to elements.
   */
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const saveButtonRef = useRef(null);

  /**
   * Trap key tabs within the dialog.
   *
   * @param {Event} event The Event object.
   */
  const onKeyPressed = (event) => {
    const { TAB } = keyCodes;
    const { keyCode, shiftKey } = event;

    if (isOpen && keyCode === TAB) {
      if (shiftKey && closeButtonRef.current.contains(event.target)) {
        event.preventDefault();
        /*
         * Move back from the first interactive child element to the last
         * interactive child element
         */
        saveButtonRef.current.focus();
      } else if (!shiftKey && saveButtonRef.current.contains(event.target)) {
        event.preventDefault();
        /*
         * Move forward from the last interactive child element to the first
         * interactive child element.
         */
        closeButtonRef.current.focus();
      }
    }
  };

  /**
   * Closes the dialog when a user clicks outside of the modal.
   *
   * @param {Event} event The Event object.
   */
  const closeDialogOnOutsideClick = (event) => {
    if (!dialogRef.current.contains(event.target)) {
      event.preventDefault();
      closeDialog();
    }
  };

  // The Dialog React element.
  const dialogElement = (
    <div
      className={styles.overlay}
      onKeyDown={onKeyPressed}
      onClick={closeDialogOnOutsideClick}
      role="presentation"
      aria-hidden={!isOpen}
      tabIndex="-1"
      id="oovvuu-dialog-wrapper"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
      >
        <div className={styles.container}>
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
            ref={saveButtonRef}
            type="button"
            onClick={closeDialog}
          >
            {__('Save', 'oovvuu')}
          </button>
        </div>
      </div>
    </div>
  );

  // The dialog container div.
  const dialogContainerEl = document.getElementById('oovvuu-dialog-wrapper-container');

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
};

export default Dialog;
